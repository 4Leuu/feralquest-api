import { z } from "zod";
import { Sizes, Types} from "../enum/productEnum";

export const createProductDTO = z.object({
  name: z.string(),
  fabric: z.string(),
  sizes: z.array(
    z.object({
      size: z.enum([Sizes.P, Sizes.M, Sizes.G, Sizes.GG]),
      quantity: z.number(),
    })
  ),
  description: z.string(),
  price: z.number(),
  typeProduct: z.object({
    type: z.enum([Types.CAMISETAS, Types.BONES]),
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

export const searchById = z.object({
  id: z.string(),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
export type UpdateProductDTO = z.infer<typeof updateProductDTO>;
export type SearchByIdDTO = z.infer<typeof searchById>;
