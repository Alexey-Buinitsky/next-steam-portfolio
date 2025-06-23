import { StaticImageData } from 'next/image'
import image from './../../../public/images/case.png'

export interface IRow {
	id: string
	icon: StaticImageData
	name: string
  quantity: number
  buyPrice: number
  currentPrice: number
}

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