import { threebInit, threeb, drawFPS } from "./3dInit";

function clicked() {
	const header = document.querySelector(".listo");
	if (header instanceof HTMLElement) {
		header.style.display = "none";
	}
}


export function initFunction(updateScene: Function): threeb
{
	document.querySelector("#hide-header")?.addEventListener("click", clicked);

	let canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#cavo");
	if (canvas === null)
	{
		throw new Error("canvas returned null");

	}


	const counter = document.querySelector("#fps-header");
	const threeb = threebInit(<HTMLCanvasElement>canvas);
	drawFPS(threeb, <HTMLElement>counter, updateScene);
	
	
	const resize = () => {
		const width = canvas.clientWidth
		const height = canvas.clientHeight
		if (width === 0 || height === 0) return

		threeb.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		threeb.renderer.setSize(width, height, false)

		threeb.camera.aspect = width / height
		threeb.camera.updateProjectionMatrix()
	}
	const observer = new ResizeObserver(resize)
	observer.observe(canvas)
	threeb.touch({ dispose(){observer.disconnect()} })
	resize() // apply the initial size
	
	
	
	return (threeb);
}