import { DoubleSide, ShaderMaterial } from 'three'
//@ts-ignore
import vShader from '../../shaders/refractive/refractive_vertex.glsl?raw'
//@ts-ignore
import fShader from '../../shaders/refractive/refractive_fragment.glsl?raw'

export function Refractive() {
	return new ShaderMaterial({
		uniforms: {
			time: { value: 1.0 }
		},
		vertexShader: vShader,
		fragmentShader: fShader,
		transparent: true,
		side: DoubleSide
	})
}
