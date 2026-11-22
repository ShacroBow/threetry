import * as THREE from "three"
import { threeb } from "./3dInit"
import { getFresnelMat } from "./utility";

const loader = new THREE.TextureLoader();

export function spawnEarth(greeb: threeb): THREE.Mesh{
	const touch = greeb.touch;
	const geo = touch(new THREE.IcosahedronGeometry(1, 9));
	const mat = touch(new THREE.MeshStandardMaterial({
		map: loader.load("../textures/earth-map-5k.jpg")
	}));
	const earthMesh = touch(new THREE.Mesh(geo, mat)); 
	
	return earthMesh;
}

export function lightMesh(greeb: threeb): THREE.Mesh{
	const touch = greeb.touch;
	const geo = touch(new THREE.IcosahedronGeometry(1, 9));
	const matlight = touch(new THREE.MeshStandardMaterial({
		// color: 0x515151,
		map: loader.load("../textures/earth-nightmap-4k.jpg"),
		blending: THREE.AdditiveBlending,
		// transparent: true,
		// opacity: 0.6
	}));
	const lightMesh = touch(new THREE.Mesh(geo, matlight)); 
	return lightMesh;
}


export function cloudMesh(greeb: threeb): THREE.Mesh{
	const touch = greeb.touch;
	const geo = touch(new THREE.IcosahedronGeometry(1., 9));
	const matcloud = touch(new THREE.MeshStandardMaterial({
		// color: 0x515151,
		map: loader.load("../textures/earth-clouds-4k.jpg"),
		blending: THREE.AdditiveBlending,
		transparent: true,
		opacity: 0.6
	}));
	const cloudMesh = touch(new THREE.Mesh(geo, matcloud)); 
	const matFresnel = getFresnelMat();
	
	const glowMesh = touch(new THREE.Mesh(geo, matFresnel)); 
	cloudMesh.scale.setScalar(1.01);
	cloudMesh.add(glowMesh);
	glowMesh.scale.setScalar(1);
	return cloudMesh;
}

