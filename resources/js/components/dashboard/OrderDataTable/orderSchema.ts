import { z } from "zod";

const orderSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    name: z.string(),
    email: z.string(),
    amount: z.number(),
    payment: z.string(),
    status: z.string(),
    createdAt: z.string(),
    croppedImageUrl: z.string(),
});

export default orderSchema;

export type TOrder = z.infer<typeof orderSchema>;
