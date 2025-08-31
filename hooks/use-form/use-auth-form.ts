'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type DefaultValues } from "react-hook-form"
import { authSchema, registerSchema, type AuthOrRegisterFormValues} from "@/lib"

export const useAuthForm = (mode: AuthMode = 'login') => {
  const schema = mode === 'login' ? authSchema : registerSchema;
  
  const defaultValues: DefaultValues<AuthOrRegisterFormValues> = mode === 'login' 
    ? { email: '', password: '' }
    : { email: '', password: '', nickname: '' };

  const form = useForm<AuthOrRegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  })

  return {
    form,
    schema,
    mode,
  }
}

export type AuthMode = 'login' | 'register'
