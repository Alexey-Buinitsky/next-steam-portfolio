import { AppTable, columns, PortfoliosProvider } from "@/components/shared";

export default function Portfolio() {
	return (
		<PortfoliosProvider>
			<AppTable columns={columns} />
		</PortfoliosProvider>
	)
}