import { Metadata } from "next";
import { Currency } from "@/components/shared";

export const metadata: Metadata = {
	title: "Currencies",
	openGraph: {
		title: "Currencies",
	}
}

export default function Currencies() {
	return (
		<Currency />
	)
}