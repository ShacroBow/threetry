import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

type item = { dispose(): void, name?: string};// 
export interface threeb{
	scene: THREE.Scene,
	camera: THREE.PerspectiveCamera,
	renderer: THREE.WebGLRenderer
	dispose: item[]
	touch: <T extends item>(func: T) => T,
	controls: OrbitControls
}

export function drawFPS(greeb: threeb, counter: HTMLElement,updateScene: Function){
	const timer = new THREE.Timer();
	timer.connect(document);
	let dt = 0;
	let acc = 0;
	let real = 0;
	let average = 0;
	let smoothing = 0.99;
	let targetfps = 30;
	let fps = targetfps;
	let frameinterval = 1/targetfps; 

	greeb.renderer.setAnimationLoop((time) => {
		timer.update(time);
		dt = timer.getDelta();
		acc += dt; // accumulator 
		real += dt; //real elasped time
		greeb.controls.update()//needs updating all the time.

		if (acc < (frameinterval)) return; // if acc matches 1 frame
		acc %= frameinterval;
		
		//just logging current framerate and smoothing changes
		average = 1/real;
		fps = (fps * smoothing) + (average * (1-smoothing));
		counter.innerText = `fps: ${Math.round(fps)}`;
		
		//actual use rendering here.
		updateScene(real);
		greeb.renderer.render(greeb.scene, greeb.camera);
		real = 0;
	})
}



export function threebInit(canvas: HTMLCanvasElement): threeb
{
	const dispose: item[] = [];// [] == empty array
	//------same but with Array object.
	const disposables: Array<{ dispose(): void}> = []
	const touch =  <T extends item>(func: T): T =>{ dispose.push(func); return func};
	
	const renderer  = touch(new THREE.WebGLRenderer({canvas, antialias: true}));
	renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(70, 
		canvas.clientWidth/canvas.clientHeight, 0.1, 100);
	camera.position.z = 5;
	scene.background = new THREE.Color(0x0a0a0f);
	scene.add(new THREE.AmbientLight(0xffffff, 0.03));
	
	const controls = touch(new OrbitControls(camera, canvas));
	controls.enableDamping= true;
	controls.dampingFactor = 0.03;

	
	const sunlight = new THREE.DirectionalLight(0xffffff);
	sunlight.position.set(-2,0.5,1.5);
	scene.add(sunlight);
	// const hemilight = new THREE.HemisphereLight(0x7f7f7f, 0x000000);
	// hemilight.position.y +=5;
	// scene.add(hemilight);


	return { scene, camera, renderer, dispose, touch, controls}
}