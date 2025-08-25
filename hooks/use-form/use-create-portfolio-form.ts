'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createPortfolioSchema, type CreatePortfolioFormValues} from "@/lib"

export const useCreatePortfolioForm = () => {
  const form = useForm<CreatePortfolioFormValues>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      name: ''
    },
    mode: 'onChange'
  });

  return { form }
};