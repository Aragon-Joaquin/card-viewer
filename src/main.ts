import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
//@ts-ignore
import Stats from 'three/examples/jsm/libs/stats.module'
import { applyShader, TYPES_SHADERS } from './core/applyShader'
import { CARD_SIZES, loadSprite, LOCAL_CARDS, resizeRenderer, UTILITY_IMGS, type LOCAL_CARD_VALUES } from './utils'

window.addEventListener(
	'load',
	() => {
		const canvas = document.querySelector('#main-canvas')!
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true })
		const scene = new THREE.Scene()

		//! camera
		const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
		camera.position.set(0, 0, 0)

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

		controls.minDistance = 20
		controls.maxDistance = 200
		controls.enableDamping = true
		controls.dampingFactor = 0.03
		controls.enablePan = false
		//enable pan for both axis, with a limited scope

		//! figure - Card
		const LSprite = loadSprite()

		const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }) // i like this gray :)
		const changeFrontCard = (img: LOCAL_CARD_VALUES = LOCAL_CARDS.MONSTER) => [
			edgeMaterial,
			edgeMaterial,
			edgeMaterial,
			edgeMaterial,
			new THREE.MeshPhongMaterial({ map: LSprite(img) }),
			new THREE.MeshPhongMaterial({ map: LSprite(UTILITY_IMGS.BACKCARD) })
		]

		const cardMat = changeFrontCard()
		const cardGeo = new THREE.BoxGeometry(CARD_SIZES.WIDTH, CARD_SIZES.HEIGHT, CARD_SIZES.THICKNESS)

		const card = new THREE.Mesh(cardGeo, cardMat)
		scene.add(card)

		//! figure - card effect layer
		const effectLayer = applyShader(TYPES_SHADERS.NONE)
		effectLayer.translateZ(0.1)
		scene.add(effectLayer)

		//! stats
		const stats = Stats()
		document.body.appendChild(stats.dom)

		//! reloads 60 fps - render function
		function tick() {
			resizeRenderer(renderer, camera)

			// effectLayer.material.uniforms.time.value += 0.01

			controls.update()
			stats.update()
			renderer.render(scene, camera)

			requestAnimationFrame(tick)
		}

		requestAnimationFrame(tick)

		//! datGUI
		const gui = new GUI()

		const cameraFolder = gui.addFolder('Camera')
		cameraFolder.add({ Reset_CameraPosition: () => camera.position.set(0, 20, 100) }, 'Reset_CameraPosition')

		const cardFolder = gui.addFolder('Card')
		cardFolder
			.add({ Type_of_card: '' }, 'Type_of_card', LOCAL_CARDS)
			.onChange((type_card: LOCAL_CARD_VALUES) => (card.material = changeFrontCard(type_card)))

		const effectFolder = gui.addFolder('Effects')
		effectFolder.add({ effects: '' }, 'effects', Object.keys(TYPES_SHADERS)).onChange((eff) => {
			console.log(eff)

			effectLayer.material = TYPES_SHADERS[eff as keyof typeof TYPES_SHADERS]
		})
	},
	{ once: true }
)
