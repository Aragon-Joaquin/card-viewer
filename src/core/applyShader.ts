import { Mesh, PlaneGeometry } from 'three'
import { CARD_SIZES } from '../utils'
import { Blink, defaultMesh } from './effects'

export const TYPES_SHADERS = {
	NONE: defaultMesh(),
	BLINK: Blink()
}

export function applyShader(shaderName: (typeof TYPES_SHADERS)[keyof typeof TYPES_SHADERS]) {
	const effectGeo = new PlaneGeometry(CARD_SIZES.WIDTH, CARD_SIZES.HEIGHT)
	return new Mesh(effectGeo, shaderName)
}
