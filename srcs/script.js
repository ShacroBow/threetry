console.log("Hi");
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.querySelector('.scene');
const scene =  new THREE.Scene();
scene.background = new THREE.Color(0x20242c);

const fov=90;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(2,2,5);

const renderer = new THREE.WebGLRenderer({ antialias: true})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const meshlight = new THREE.HemisphereLight(0xffffff,0x444466,2);
scene.add(meshlight);

const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshStandardMaterial({color: 0x44aa88})
);
scene.add(mesh);

function resize(){
	const { clientWidth, clientHeight} = container;
	camera.aspect = clientWidth /clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(clientWidth, clientHeight);
}

window.addEventListener('resize', resize);

function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();

const panel = document.querySelector('#ui');
const toggle = document.querySelector('#toggle-ui');

toggle.addEventListener("click", () => {
	const isopen = toggle.getAttribute('aria-expanded') === 'true';
	panel.hidden = isopen;
	toggle.setAttribute('aria-expanded', String(!isopen));
	toggle.textContent = isopen ? 'Show panel' : 'Hide panel';
});