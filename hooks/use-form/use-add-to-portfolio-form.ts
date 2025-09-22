'use client'

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addToPortfolioSchema, type AddToPortfolioFormValues } from "@/form"

export function useAddToPortfolioForm(initialPrice: number = 0, resetOnPriceChange: boolean = false) {
	const form = useForm<AddToPortfolioFormValues>({
		resolver: zodResolver(addToPortfolioSchema),
		defaultValues: {
			portfolioId: "",
			buyPrice: String(initialPrice) || String(0),
			quantity: String(1),
		},
	})

	React.useEffect(() => {
		if (resetOnPriceChange) {
			form.reset({
				buyPrice: String(initialPrice),
				quantity: String(1),
				portfolioId: form.getValues("portfolioId"),
			})
		}
	}, [initialPrice, resetOnPriceChange, form])

	return form
}