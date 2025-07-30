'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type DefaultValues } from "react-hook-form"
import * as z from 'zod'

const baseSchema = z.object({
  login: z.string().min(3, 'Login must contain at least 3 characters'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

const registerSchema = baseSchema.extend({
  nickname: z.string().min(1, 'Nickname must contain at least 1 character'),
});

export const useAuthForm = (mode: AuthMode = 'login') => {
  const schema = mode === 'login' ? baseSchema : registerSchema;
  
  const defaultValues: DefaultValues<AuthFormValues> = mode === 'login' 
    ? { login: '', password: '' }
    : { login: '', password: '', nickname: '' };

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  return {
    form,
    schema,
    mode,
  };
};

export type AuthMode = 'login' | 'register';
export type BaseFormValues = z.infer<typeof baseSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type AuthFormValues = BaseFormValues | RegisterFormValues;