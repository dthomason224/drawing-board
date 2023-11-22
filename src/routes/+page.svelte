<script lang="ts">
	import DrawnPaint from "$lib/components/DrawnPaint.svelte"
  	import { Canvas } from "svelte-canvas";
	import type { DrawnObject, Point } from "$lib/types";
	import { backgroundCanvas, clearFrames, dragging, drawSelection, drawnObjects, lineColor, lineWidth, normalBackgroundCanvas, offset, options, scale, scaleOffset } from "$lib/stores";
	import { onZoom } from "$lib/zoom";
	import { onMount } from "svelte";

	let startPoint: Point = [Infinity, Infinity];
	let endPoint: Point = [Infinity, Infinity];

	let radius: number = Infinity;

	let points: Point[] = [];
	let heldKeys: string[] = [];

	onMount(() => {
		normalBackgroundCanvas.set($backgroundCanvas.getCanvas());
	});

	$: {
		if ($backgroundCanvas) {
			const scaledWidth: number = $backgroundCanvas.getCanvas().width * $scale;
			const scaledHeight: number = $backgroundCanvas.getCanvas().height * $scale;
	
			const newScaleOffset: Point = [(scaledWidth - $backgroundCanvas.getCanvas().width) / 2, (scaledHeight - $backgroundCanvas.getCanvas().height) / 2];
			scaleOffset.set(newScaleOffset);
		}
	}

	function handleMouseDown(e: MouseEvent) {
		$dragging = true;

		addEventListener("mouseup", handleMouseUp);

		startPoint = findMousePos(e);

		switch ($drawSelection.value) {
			case "Paint":
				points.push(startPoint);
				$clearFrames = false;
				endPoint = startPoint;
				points.push(endPoint);
				
				break;
			case "Rectangle":
				$clearFrames = true;
			case "Circle":
				$clearFrames = true;
	
				break;
			case "Pan":
				
				break;
			default:
				break;
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if ($dragging) {
			switch ($drawSelection.value) {
				case "Paint":
					endPoint = findMousePos(e);
					points.push(endPoint);
					
					break;
				case "Rectangle":
					endPoint = findMousePos(e);
					
					break;
				case "Circle":
					endPoint = findMousePos(e);
					radius = findDistance();
					
					break;
				case "Pan":
					endPoint = findMousePos(e);

					const delta = [(endPoint[0] - startPoint[0]), (endPoint[1] - startPoint[1])];

					offset.update(value => [value[0] + delta[0], value[1] + delta[1]]);
					break;
				default:
					break;
			}
		}
	}

	function handleMouseUp() {
		$dragging = false;

		if ($drawSelection.value !== "Pan" && $drawSelection.component) {
			const newShape: DrawnObject = {
				component: $drawSelection.component,
				props:{
					color: $lineColor,
					lineWidth: $lineWidth,
				}
			}

			switch (newShape.component) {
				case options[0].component:
					newShape.component = DrawnPaint;
					newShape.props.points = points;
					break;
				case options[1].component:
					newShape.props.startPoint = startPoint;
					newShape.props.endPoint = endPoint;
					break;
				case options[2].component:
					newShape.props.startPoint = startPoint;
					newShape.props.radius = radius;
					break;
				default:
					break;
			}
			console.log(newShape);
		
			$drawnObjects.push(newShape);
		
			$drawnObjects = $drawnObjects;

			points = [];
		}
		
		$clearFrames = true;
		endPoint = [Infinity, Infinity];
		startPoint = [Infinity, Infinity];
		radius = Infinity;
		
		removeEventListener("mouseup", handleMouseUp);
	}

	function handleKeyDown(e: KeyboardEvent) {
		e.preventDefault();

		const key = e.key;

		if (!heldKeys.includes(key)) {
			heldKeys = [...heldKeys, key];
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		e.preventDefault();

		const key = e.key;

		heldKeys = heldKeys.filter((heldKey) => heldKey !== key);
	}

	function zoomOrPanCanvas(e: WheelEvent) {
		e.preventDefault();
		
		if (heldKeys.includes("Control")) {
			onZoom(e.deltaY * -0.01);
		}
		else {
			offset.update(value => [value[0] , value[1] - e.deltaY]);
		}
	}

	function findMousePos(e: MouseEvent) {
		return [(e.clientX - $offset[0] * $scale + $scaleOffset[0]) / $scale  , (e.clientY - $offset[1] * $scale + $scaleOffset[1]) / $scale] as Point;
	}

	function findDistance() {
        return Math.sqrt(Math.pow(endPoint[0] - startPoint[0], 2) + Math.pow(endPoint[1] - startPoint[1], 2));
    }
		
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} on:wheel={zoomOrPanCanvas}/>

<div class="relative h-full w-full bg-white">
    <Canvas 
		bind:this={$backgroundCanvas}
		class="absolute"
	>
		{#if $drawnObjects}
			{#each $drawnObjects as drawnObject}
				<svelte:component this={drawnObject.component} {...drawnObject.props}> </svelte:component>
			{/each}
		{/if}
    </Canvas>
	<Canvas
		autoclear={$clearFrames}
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		on:wheel={zoomOrPanCanvas}
		class="absolute"
	>
		{#if $drawSelection.value === "Paint" || $drawSelection.value === "Rectangle"}
			<svelte:component this={$drawSelection.component} {startPoint} {endPoint} lineWidth={$lineWidth} color={$lineColor}/>
		{:else if $drawSelection.value === "Circle"}
			<svelte:component this={$drawSelection.component} {startPoint} {radius} lineWidth={$lineWidth} color={$lineColor}/>
		{/if}
	</Canvas>
</div>
