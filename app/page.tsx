import { AppTable } from "@/components/shared/";
import { columns } from "@/components/shared/app-table/columns";
import { rows } from "@/components/shared/app-table/data";

export default function Home() {
	return (
		<>
			<AppTable className="p-2" columns={columns} data={rows} />
		</>
	);
}