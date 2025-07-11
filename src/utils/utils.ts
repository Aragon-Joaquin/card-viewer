import { SRGBColorSpace, TextureLoader } from 'three'
import type { LOCAL_CARD_VALUES, UTILITY_IMGS } from './constants'

const ASSETS_URL = (name: string) => `src/assets/types/${name}`

export function loadSprite() {
	const textureLoader = new TextureLoader()

	return (url: LOCAL_CARD_VALUES | (typeof UTILITY_IMGS)[keyof typeof UTILITY_IMGS]) => {
		const texture = textureLoader.load(ASSETS_URL(url))
		texture.colorSpace = SRGBColorSpace
		return texture
	}
}
