import { BanknoteArrowDownIcon, BanknoteArrowUpIcon, LucideProps } from "lucide-react"

export interface IMetricData {
	key: string
	icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
	value: string
}

export const metricsData: IMetricData[] = [
	{
		key: "Total Invested",
		icon: BanknoteArrowDownIcon,
		value: "$45,231.89",
	},
	{
		key: "Total Worth",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
	{
		key: "Gain",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
	{
		key: "Estimated gain after fees",
		icon: BanknoteArrowUpIcon,
		value: "$45,231.89",
	},
]