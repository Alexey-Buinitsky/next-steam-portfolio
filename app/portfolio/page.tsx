import { Metadata } from "next";
import { AppTable, columns, PortfoliosProvider } from "@/components/shared";

export const metadata: Metadata = {
	title: "Portfolio",
	openGraph: {
		title: "Portfolio",
	},
	robots: {
		index: false,
		follow: true,
	}
}

export default function Portfolio() {
	return (
		<PortfoliosProvider>
			<AppTable columns={columns} />
		</PortfoliosProvider>
	)
}