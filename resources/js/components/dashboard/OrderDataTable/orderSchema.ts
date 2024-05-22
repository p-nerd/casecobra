import { z } from "zod";

const orderSchema = z.object({
    id: z.string(),
    email: z.string(),
    amount: z.number(),
    paid: z.boolean(),
    status: z.string(),
    create_at: z.string(),
    update_at: z.string(),
});

export default orderSchema;

export type TOrder = z.infer<typeof orderSchema>;
