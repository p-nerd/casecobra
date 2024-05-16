import { NextResponse, type NextRequest } from "next/server";

import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { Resend } from "resend";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.text();
        const signature = headers().get("stripe-signature");

        if (!signature) {
            return new Response("Invalid signature", { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );

        if (event.type === "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) {
                throw new Error("Missing user email");
            }

            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            };

            if (!userId || !orderId) {
                throw new Error("Invalid request metadata");
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.shipping_details!.address;

            const updatedOrder = await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    ShippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            county: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state,
                        },
                    },
                    BillingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            county: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,
                            state: billingAddress!.state,
                        },
                    },
                },
            });

            await resend.emails.send({
                from: "CaseCobra <hello@joshtriedcoding.com>",
                to: [event.data.object.customer_details.email],
                subject: "Thanks for your order!",
                react: OrderReceivedEmail({
                    orderId,
                    orderDate: updatedOrder.createdAt.toLocaleDateString(),
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details!.name!,
                        city: shippingAddress!.city!,
                        county: shippingAddress!.country!,
                        postalCode: shippingAddress!.postal_code!,
                        street: shippingAddress!.line1!,
                        state: shippingAddress!.state,
                    },
                }),
            });
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (error: any) {
        console.error(error);

        return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 });
    }
};
