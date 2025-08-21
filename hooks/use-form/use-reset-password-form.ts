'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

const formSchema = z.object({
  code: z.string().length(6, 'Code must be 6 characters'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const useResetPasswordForm = () =>{
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onSubmit'
    })

    return { form }
}

export type ResetPasswordFormValues = z.infer<typeof formSchema>;