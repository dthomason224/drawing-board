<script lang="ts">
	import { Layer, type Render } from "svelte-canvas";
	import type { Point } from "$lib/types";
	import { offset, scale, scaleOffset } from "$lib/stores";
	
	export let startPoint: Point;
	export let endPoint: Point;

	export let lineWidth: number;

	export let color: string;
	
	let render: Render;

	$: render = ({ context }) => {
		context.save();
		context.fillStyle = color;
		context.lineWidth = lineWidth;
		let width = startPoint[0] - endPoint[0];
		let height = startPoint[1] - endPoint[1];
		context.beginPath();
        context.setTransform($scale, 0, 0, $scale, $offset[0] * $scale - $scaleOffset[0], $offset[1] * $scale - $scaleOffset[1]);
		context.rect(endPoint[0], endPoint[1], width, height);
		context.fill();
		context.restore();
	};
</script>

<Layer {render} />