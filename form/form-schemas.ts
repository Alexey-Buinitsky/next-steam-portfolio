import { z } from "zod";

export const portfolioSchema = z.object({
	portfolioName: z.string()
		.min(1, { message: "Portfolio name is required", })
		.transform(value => value.trim())
		.pipe(z.string().min(1, { message: "Portfolio name cannot be empty after trimming" })),
})

export const portfolioAssetSchema = z.object({
	quantity: z.string()
		.min(1, { message: "Quantity is required" })
		.refine(value => !isNaN(Number(value)) && Number(value) > 0 && Number.isInteger(Number(value)), { message: "Quantity must be a whole number greater than 0" }),
	buyPrice: z.string()
		.min(1, { message: "Buy price is required" })
		.refine(value => { return /^\d+(\.\d{1,2})?$/.test(value) && Number(value) >= 0 }, { message: "Buy price must be ≥ 0 with up to 2 decimal places (e.g., 0, 0.01, 1.23)" }),
})