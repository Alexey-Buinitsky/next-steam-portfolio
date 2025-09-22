import { Asset } from "@prisma/client"

export const formatAssetType = (asset: Asset): string => {
	const lowerType = asset.type.toLowerCase()
	const lowerName = asset.name.toLowerCase()

	if (lowerType.includes('base grade container')) {

		if (lowerName.includes('sticker') || lowerName.includes('capsule')) {
			return 'Capsules'
		}

		if (lowerName.includes('souvenir') || lowerType.includes('package')) {
			return 'Souvenirs'
		}

		return 'Cases'
	}

	if (lowerType.includes('sticker')) {
		return 'Stickers'
	}

	if (lowerType.includes('rifle') || lowerType.includes('pistol') || lowerType.includes('smg') || lowerType.includes('heavy') || lowerType.includes('knife')
		|| lowerType.includes('sniper') || lowerType.includes('shotgun') || lowerType.includes('equipment') || lowerType.includes('gun') || lowerType.includes('gloves')) {
		return 'Weapons'
	}

	if (lowerType.includes('agent') || lowerType.includes('character')) {
		return 'Agents'
	}

	if (lowerType.includes('music') || lowerType.includes('kit')) {
		return 'Music Kits'
	}

	if (lowerType.includes('charm')) {
		return 'Charm'
	}

	if (lowerType.includes('graffiti')) {
		return 'Graffiti'
	}

	if (lowerType.includes('patch')) {
		return 'Patches'
	}

	if (lowerType.includes('pass') || lowerType.includes('operation') || lowerType.includes('access')) {
		return 'Passes'
	}

	return asset.type
}