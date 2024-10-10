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

export const updateProductDTO = z.object({
  id: z.string(),
  name: z.string().optional(),
  fabric: z.string().optional(),
  sizes: z
    .array(
      z.object({
        size: z.string().optional(),
        quantity: z.number().optional(),
      })
    )
    .optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  typeProduct: z
    .object({
      type: z.string().optional(),
    })
    .optional(),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
export type UpdateProductDTO = z.infer<typeof updateProductDTO>;
