'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type DefaultValues } from "react-hook-form"
import * as z from 'zod'

const baseSchema = z.object({
  email: z.string().min(3, 'Please enter a valid email address'),
  password: z.string().min(8, 'Password must contain at least 8 characters')
});

const registerSchema = baseSchema.extend({
  nickname: z.string().min(1, 'Nickname must contain at least 1 character'),
  // password: z.string()
    // .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Must contain at least one number')
    // .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
});

export const useAuthForm = (mode: AuthMode = 'login') => {
  const schema = mode === 'login' ? baseSchema : registerSchema;
  
  const defaultValues: DefaultValues<AuthFormValues> = mode === 'login' 
    ? { email: '', password: '' }
    : { email: '', password: '', nickname: '' };

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
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