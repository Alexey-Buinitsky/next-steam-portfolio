'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

const portfolioSchema = z.object({
  name: 
    z.string()
    .min(1, 'Name must contain at least 1 character')
    .max(50, 'Name must be at most 50 characters'),
});

export const useCreatePortfolioForm = () => {
  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      name: ''
    },
    mode: 'onChange'
  });
  return {form}
};

export type PortfolioFormValues = z.infer<typeof portfolioSchema>;