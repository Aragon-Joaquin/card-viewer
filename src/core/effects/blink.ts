import { DoubleSide, ShaderMaterial } from 'three'

//@ts-ignore
import vShader from '../../shaders/blink/blink_vertex.glsl?raw'
//@ts-ignore
import fShader from '../../shaders/blink/blink_fragment.glsl?raw'

export function Blink() {
	return new ShaderMaterial({
		uniforms: {
			time: { value: 1.0 },
			flashWidth: { value: 0.5 },
			speed: { value: 0.1 }, // higher value = slower
			intensity: { value: 0.7 }, // 0.0 to 1.0
			delay: { value: 2.0 }
		},
		vertexShader: vShader,
		fragmentShader: fShader,
		transparent: true,
		side: DoubleSide
		// blending: THREE.AdditiveBlending, // or THREE.NormalBlending
		// depthWrite: false
	})
}
