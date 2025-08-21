import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/auth', '/auth/*', '/portfolio', '/portfolio/*', '/api', '/api/*', '/_next', '/_error', '/404', '/500'],
		},
		sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
	}
}