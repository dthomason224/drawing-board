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
		
		context.lineCap = "round";
		context.lineJoin = "round";
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		context.beginPath();
        context.setTransform($scale, 0, 0, $scale, $offset[0] * $scale - $scaleOffset[0], $offset[1] * $scale - $scaleOffset[1]);
		context.moveTo(...startPoint);
		context.lineTo(...endPoint);
		context.stroke();
		context.restore();
		
		startPoint = endPoint
	};
	
</script>

<Layer {render} />