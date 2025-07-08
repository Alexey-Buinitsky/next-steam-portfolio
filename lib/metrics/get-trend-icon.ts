import { BanknoteArrowDownIcon, BanknoteArrowUpIcon, BanknoteIcon, LucideProps } from 'lucide-react';

export type TrendType = "up" | "down" | "neutral";

export const getTrendIcon = (trend: TrendType): React.ComponentType<LucideProps> => {
	const icons = { up: BanknoteArrowUpIcon, down: BanknoteArrowDownIcon, neutral: BanknoteIcon, }
	return icons[trend];
}