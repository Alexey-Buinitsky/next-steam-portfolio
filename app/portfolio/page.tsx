import { AppTable, columns } from "@/components/shared";
import { PortfoliosProvider } from "@/components/shared/portfolios-provider";

export default function Portfolio() {
	return (
		<PortfoliosProvider>
			<AppTable columns={columns}/>
		</PortfoliosProvider>
	)
}