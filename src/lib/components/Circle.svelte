<script lang="ts">
	import { offset, scale, scaleOffset } from "$lib/stores";
	import type { Point } from "$lib/types";
	import { Layer, type Render } from "svelte-canvas";

    export let startPoint: Point;
    export let radius: number;

    export let lineWidth: number;

	export let color: string;

    let render: Render;

    $: render = ({context}) => {
        context.save();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.beginPath();
        context.setTransform($scale, 0, 0, $scale, $offset[0] * $scale - $scaleOffset[0], $offset[1] * $scale - $scaleOffset[1]);
        context.arc(startPoint[0], startPoint[1], radius, 0, 2 * Math.PI);
        context.stroke();
        context.restore();
    };

</script>

<Layer {render}/>