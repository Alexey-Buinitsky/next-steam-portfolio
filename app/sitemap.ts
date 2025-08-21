import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/market`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/currencies`,
			lastModified: new Date(),
		},
	]
}