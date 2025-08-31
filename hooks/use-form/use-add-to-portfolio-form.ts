'use client'

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addToPortfolioSchema, type AddToPortfolioFormValues} from "@/lib"

// Подключаем к форме через resolver, устанавливаем дефолтные значения:
export function useAddToPortfolioForm (initialPrice: number = 0, resetOnPriceChange: boolean = false) {
  const form = useForm<AddToPortfolioFormValues>({
    resolver: zodResolver(addToPortfolioSchema),
    defaultValues: {
      portfolioId: "",
      buyPrice: initialPrice || 0,
      quantity: 1,
    },
  })

   useEffect(() => { // необходимо для реализации разделения статичного и модального окна
    if (resetOnPriceChange) {
      form.reset({
        buyPrice: initialPrice,
        quantity: 1,
        portfolioId: form.getValues("portfolioId"), // Сохраняем выбранный портфель
      })
    }
  }, [initialPrice, resetOnPriceChange, form])

  return form
}

