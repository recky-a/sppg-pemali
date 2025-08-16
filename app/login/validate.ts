import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .email({ message: 'Email tidak valid' })
    .min(3, { message: 'Email harus diisi' }),
  password: z.string().min(6, {
    message:
      'Password atau kata sandi harus lebih atau tidak kurang dari 6 karakter',
  }),
});

export type SignInValues = z.infer<typeof SignInSchema>;
