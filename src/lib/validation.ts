import { z } from "zod";

export const productFilterSchema = z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    size: z.string().optional(),
    brand: z.string().optional(),
});

export type ProductFilterValues = z.infer<typeof productFilterSchema>