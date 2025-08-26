import { FormField, PortfolioFormValues, PortfolioAssetFormValues } from "@/form/form-types"

export const portfolioFields: FormField<PortfolioFormValues>[] = [{
	name: "portfolioName",
	label: "Portfolio Name",
	placeholder: "Enter a name...",
	type: "text",
	maxLength: 16,
}]

export const portfolioAssetFields: FormField<PortfolioAssetFormValues>[] = [
	{
		name: "quantity",
		label: "Quantity",
		placeholder: "Enter an quantity...",
		type: "number",
		min: 1,
		max: 9999999,
		step: 1,
	},
	{
		name: "buyPrice",
		label: "Buy Price",
		placeholder: "Enter a buy price...",
		type: "number",
		min: 0,
		max: 9999999.99,
		step: 0.01,
	},
]