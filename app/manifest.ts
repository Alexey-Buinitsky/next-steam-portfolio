import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Steam Portfolio',
		short_name: 'S.Portfolio',
		description: 'Create investment portfolios for CS2 on Steam marketplace. Professional Steam currency converter and portfolio analysis tools for traders and investors.',
		start_url: '/',
		display: 'standalone',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
		categories: ["finance", "business", "games"],
		lang: "en-US",
	}
}