import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = 80;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 3;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;




const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial(
	{
		color: 0xffffff,
		flatShading: true
	}
);

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);


const hemilight = new THREE.HemisphereLight(0xFFFFFF, 0x000000)
scene.add(hemilight);

const wiremat  = new THREE.MeshBasicMaterial(
	{
		color: 0xccff,
		wireframe: true
	}
);

const wiremesh = new THREE.Mesh(geo, wiremat);
wiremesh.scale.setScalar(1.001);
mesh.add(wiremesh);



function animate(t=0){
	requestAnimationFrame(animate);
	mesh.rotation.y = t * 0.0001;
	renderer.render(scene, camera);
	controls.update();
}

animate();
