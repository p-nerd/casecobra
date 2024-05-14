"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BASE_PRICE, FINISHES, MATERIALS } from "../design/useOptions";
import { Order } from "@prisma/client";
import stripe from "@/lib/stripe";

export const createCheckoutSession = async (data: { createCaseId: string }) => {
    const createCase = await db.createCase.findUnique({ where: { id: data.createCaseId } });
    if (!createCase) {
        throw new Error(`createCase not found, id: ${data.createCaseId}`);
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error(`you need to be logged in`);
    }

    const material = MATERIALS.find(m => m.value === createCase.caseMaterial);
    const finish = FINISHES.find(f => f.value === createCase.caseFinish);

    const totalPrice = BASE_PRICE + (material?.price || 0) + (finish?.price || 0);

    let order: Order | undefined = undefined;

    order = await db.order.create({
        data: {
            amount: totalPrice / 100,
            userId: user.id,
            createCaseId: createCase.id,
        },
    });

    const product = await stripe.products.create({
        name: "Custom iPhone Case",
        images: [createCase.imageUrl],
        default_price_data: {
            currency: "USD",
            unit_amount: totalPrice,
        },
    });

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/create-case/preview?id=${createCase.id}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: { allowed_countries: ["DE", "US", "BA"] },
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
};
