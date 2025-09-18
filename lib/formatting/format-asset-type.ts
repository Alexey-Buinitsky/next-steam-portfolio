import { Asset } from "@prisma/client"

export const formatAssetType = (asset: Asset): string => {
	const lowerType = asset.type.toLowerCase()
	const lowerName = asset.name.toLowerCase()

	// CASES
	if (lowerType.includes('base grade container')) {

		if (lowerName.includes('sticker') || lowerName.includes('capsule')) {
			return 'Capsules'
		}

		if (lowerName.includes('souvenir') || lowerType.includes('package')) {
			return 'Souvenirs'
		}

		return 'Cases'
	}

	// STICKERS
	if (lowerType.includes('sticker')) {
		return 'Stickers'
	}

	// WEAPONS
	if (lowerType.includes('rifle') || lowerType.includes('pistol') || lowerType.includes('smg') || lowerType.includes('heavy') || lowerType.includes('knife')
		|| lowerType.includes('sniper') || lowerType.includes('shotgun') || lowerType.includes('equipment') || lowerType.includes('gun') || lowerType.includes('gloves')) {
		return 'Weapons'
	}

	// AGENTS
	if (lowerType.includes('agent') || lowerType.includes('character')) {
		return 'Agents'
	}

	// MUSIC KITS
	if (lowerType.includes('music') || lowerType.includes('kit')) {
		return 'Music Kits'
	}

	// CHARMS
	if (lowerType.includes('charm')) {
		return 'Charm'
	}

	// GRAFFITI
	if (lowerType.includes('graffiti')) {
		return 'Graffiti'
	}

	// PATCHES
	if (lowerType.includes('patch')) {
		return 'Patches'
	}

	// PASSES
	if (lowerType.includes('pass') || lowerType.includes('operation') || lowerType.includes('access')) {
		return 'Passes'
	}

	// По умолчанию возвращаем оригинальный тип, если не удалось классифицировать
	return asset.type
}