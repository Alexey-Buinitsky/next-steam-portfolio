import { z } from "zod";

export const portfolioSchema = z.object({
	portfolioName: z.string()
		.min(1, { message: "Portfolio name is required", })
		.transform(value => value.trim())
		.pipe(z.string().min(1, { message: "Portfolio name cannot be empty after trimming" })),
})

export const portfolioAssetSchema = z.object({
	quantity: z.string().min(1, { message: "Quantity is required" }).refine(value => !isNaN(Number(value)) && Number(value) > 0, { message: "Quantity must be greater than 0" }),
	buyPrice: z.string().refine(value => !isNaN(Number(value)) && Number(value) >= 0, { message: "Buy price must be a positive number" }),
})