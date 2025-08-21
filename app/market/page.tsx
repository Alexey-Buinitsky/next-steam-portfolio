import { Metadata } from "next";
import { MarketItems } from "@/components/shared";

export const metadata: Metadata = {
	title: "Market",
	openGraph: {
		title: "Market",
	}
}

export default function Market() {
    return (
        <MarketItems />
    )
}