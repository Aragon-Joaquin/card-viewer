import { ShaderMaterial } from 'three'

export function defaultMesh() {
	return new ShaderMaterial({
		transparent: true,
		uniforms: {
			time: { value: 0.0 }
		},
		vertexShader: `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
		fragmentShader: `
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }`
	})
}
