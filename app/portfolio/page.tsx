import { AppTable, AppTableProvider, columns, rows } from "@/components/shared";

export default function Portfolio() {
	return (
		<AppTableProvider>
			<AppTable columns={columns} data={rows} />
		</AppTableProvider>
	)
}