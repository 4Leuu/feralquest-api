import { z } from "zod";

export const createUserDTO = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export const updateUserDTO = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof createUserDTO>;
export type UpdateUserDTO = z.infer<typeof updateUserDTO>;
