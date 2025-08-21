'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const useForgotPasswordForm = () =>{
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onSubmit'
    })

    return { form }
}
     
export type ForgotPasswordFormValues = z.infer<typeof formSchema>;