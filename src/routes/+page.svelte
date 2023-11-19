<script lang="ts">
  	import { Canvas } from 'svelte-canvas';
	import Pan from '$lib/components/Pan.svelte'
	import type { Point } from '$lib/types';

	let startPoint: Point = [Infinity, Infinity];
	let endPoint: Point = [Infinity, Infinity];
	
	let offset: Point = [0, 0];
	
	let isPanning = false;

	let lastX = 0;
	let lastY = 0;

	let deltaX = 0;
	let deltaY = 0;

	let offsetX = 0;
	let offsetY = 0;

	function handleMouseDown(e: MouseEvent) {
		lastX = e.clientX;
		lastY = e.clientY;
		console.log("mouse down working");
		isPanning = true;
	}

	function handleMouseMove(e: MouseEvent) {
		if (isPanning) {
			const newX = e.clientX;
    		const newY = e.clientY;
			 
    		deltaX = newX - lastX;
    		deltaY = newY - lastY;

			offsetX += deltaX;
			offsetY += deltaY;

			lastX = newX;
			lastY = newY;
	 	}
	}

	function handleMouseUp(e: MouseEvent) {
		isPanning = false;
	}
		
</script>

<div class="relative h-full w-full bg-white">
    <Canvas 
		
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
	>
        <Pan {offsetX} {offsetY}></Pan>
    </Canvas>
</div>
