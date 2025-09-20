'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema, type ResetPasswordFormValues} from "@/form"

export const useResetPasswordForm = () =>{
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            code: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onSubmit'
    })

    return { form }
}
