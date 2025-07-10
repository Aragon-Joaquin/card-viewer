import type { PerspectiveCamera, WebGLRenderer } from 'three'

export function resizeRenderer(renderer: WebGLRenderer, camera: PerspectiveCamera) {
	const canvas = renderer.domElement
	const pixelRatio = window.devicePixelRatio

	const width = Math.floor(canvas.clientWidth * pixelRatio)
	const height = Math.floor(canvas.clientHeight * pixelRatio)

	const needResize = canvas.width !== width || canvas.height !== height

	if (!needResize) return
	renderer.setSize(width, height, false)
	camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight
	camera.updateProjectionMatrix()
}
