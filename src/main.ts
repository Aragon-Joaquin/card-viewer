import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { CARD_SIZES, resizeRenderer } from './utils'

import backCard from './assets/backcard.png'
import frontCard from './assets/uct.jpg'

window.addEventListener(
	'load',
	() => {
		const canvas = document.querySelector('#main-canvas')!
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true })

		//! camera
		const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
		camera.position.set(0, 0, 0)

		//! scene
		const scene = new THREE.Scene()

		//! lights
		const ambientLight = new THREE.AmbientLight(THREE.Color.NAMES.white, 1)

		const frontLight = new THREE.DirectionalLight(THREE.Color.NAMES.white, 3)
		frontLight.position.set(CARD_SIZES.WIDTH, CARD_SIZES.HEIGHT / 2, 50)

		const lightHelper = new THREE.DirectionalLightHelper(frontLight, 5)

		scene.add(frontLight, ambientLight, lightHelper)

		//! orbit controls
		const controls = new OrbitControls(camera, renderer.domElement)
		camera.position.set(0, 20, 100)
		controls.update()

		//! figure
		const textureLoader = new THREE.TextureLoader()
		const [frontTexture, backTexture] = [textureLoader.load(frontCard), textureLoader.load(backCard)]
		frontTexture.colorSpace = THREE.SRGBColorSpace
		backTexture.colorSpace = THREE.SRGBColorSpace

		const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }) // i like this gray :)

		const cardMat = [
			edgeMaterial,
			edgeMaterial,
			edgeMaterial,
			edgeMaterial,
			new THREE.MeshPhongMaterial({ map: frontTexture }),
			new THREE.MeshPhongMaterial({ map: backTexture })
		]
		const cardGeo = new THREE.BoxGeometry(CARD_SIZES.WIDTH, CARD_SIZES.HEIGHT, CARD_SIZES.THICKNESS)

		const cardMesh = new THREE.Mesh(cardGeo, cardMat)
		scene.add(cardMesh)

		//! reloads 60 fps
		function tick() {
			resizeRenderer(renderer, camera)

			controls.update()
			// cardMat.forEach((mat) => (mat.needsUpdate = true))
			renderer.render(scene, camera)

			requestAnimationFrame(tick)
		}

		requestAnimationFrame(tick)
	},
	{ once: true }
)
