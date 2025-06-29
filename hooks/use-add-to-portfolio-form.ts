'use client'

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

//1. Сначала создаём правила для полей через zod
const formSchema = z.object({
  portfolioId: z.string().min(1, "Select the portfolio you want to add to"),
  buyPrice: z.number().min(0.01, "Price must be at least $0.01"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

//2. Подключаем к форме через resolver, устанавливаем дефолтные значения:
export function useAddToPortfolioForm (initialPrice: number = 0, resetOnPriceChange: boolean = false) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioId: "",
      buyPrice: initialPrice || 0,
      quantity: 1,
    },
  });

   useEffect(() => { // необходимо для реализации разделения статичного и модального окна
    if (resetOnPriceChange) {
      form.reset({
        buyPrice: initialPrice,
        quantity: 1,
        portfolioId: form.getValues("portfolioId"), // Сохраняем выбранный портфель
      });
    }
  }, [initialPrice, resetOnPriceChange, form]);

  return form
};

// Тип для данных формы (можно экспортировать для использования в других файлах)
export type AddToPortfolioFormData = z.infer<typeof formSchema>;