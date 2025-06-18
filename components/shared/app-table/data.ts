import { StaticImageData } from 'next/image'
import type { IRow } from '@/types/portfolio'
import image from './../../../public/images/case.png'

export const rows: IRow[] = [
	{
		id: "1",
		icon: image,
		name: "Dreams & Nightmares Case",
		quantity: 1,
		buyPrice: 10,
		currentPrice: 10.7,
	}
]