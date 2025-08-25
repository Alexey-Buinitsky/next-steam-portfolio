import { Metadata } from "next";

export const LayoutMetadata: Metadata = {
	title: {
		default: "Steam Portfolio",
		template: "%s | Steam Portfolio"
	},
	description: "Create investment portfolios for CS2 on Steam marketplace. Professional Steam currency converter and portfolio analysis tools for traders and investors.",
	keywords: "Steam CS2 investments, Counter-Strike 2 investments, CS2 portfolio builder, Steam market analyzer, Steam market analysis, Steam currency converter, investment tools CS2, investment portfolio management, A&D Steam tools",
	authors: [{ name: 'A&D' }],
	openGraph: {
		title: {
			default: "Steam Portfolio",
			template: "%s | Steam Portfolio"
		},
		description: 'Create investment portfolios for CS2 on Steam marketplace. Professional Steam currency converter and portfolio analysis tools for traders and investors.',
		type: 'website',
		url: `${process.env.NEXT_PUBLIC_APP_URL}`,
		siteName: 'Steam Portfolio',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
	},
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
	},
}