'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/form"

export const useForgotPasswordForm = () => {
	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onSubmit'
	})

	return { form }
}