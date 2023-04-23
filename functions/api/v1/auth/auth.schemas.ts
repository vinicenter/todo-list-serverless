import { z } from 'zod';
import type { SafeParseReturnType } from 'zod'

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;

export const registerSafeParse = (body: unknown): SafeParseReturnType<RegisterType, typeof body> => {
  return registerSchema.safeParse(body);
}

export const loginSafeParse = (body: unknown): SafeParseReturnType<LoginType, typeof body> => {
  return loginSchema.safeParse(body);
}
