import { z } from "zod";

export const createProductDTO = z.object({
  name: z.string(),
  fabric: z.string(),
  sizes: z.array(
    z.object({
      size: z.string(),
      quantity: z.number(),
    })
  ),
  description: z.string(),
  price: z.number(),
  typeProduct: z.object({
    type: z.string(),
  }),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
