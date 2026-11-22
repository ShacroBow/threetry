import * as THREE from "three";
import { threeb, threebInit } from "./3dInit";
import { initFunction } from "./init";
import { cloudMesh,lightMesh, spawnEarth } from "./3dSpawn";
import { getStarfield } from "./utility";

const greeb: threeb | null = initFunction(updateScene);


if (greeb === null) {
	console.error("haha greeb is dead")
}

function cleanup(t: threeb){
	for(const ding of t.dispose){
		ding.dispose();
	}
}
window.addEventListener("unload", () => {cleanup(greeb)});



//--------
const render = greeb.renderer;
const scene = greeb.scene;
const camera = greeb.camera;
const touch = greeb.touch;



export function updateScene(dt: number){
			earth.rotation.y += dt * 0.05;
			lightMess.rotation.y += dt * 0.05;
			cloudMess.rotation.y += dt * 0.1;
}

const earthgroup = new THREE.Group();
const earth = spawnEarth(greeb);
earthgroup.add(earth)
earthgroup.rotation.z = -24.4 * Math.PI /180
const lightMess = lightMesh(greeb);
earthgroup.add(lightMess);
scene.add(earthgroup);
const cloudMess = cloudMesh(greeb);
earthgroup.add(cloudMess);



console.log("hello");
scene.add(getStarfield({numStars: 50})); // WARNING NOT DISPOSAL ARRAY PROTECTED.