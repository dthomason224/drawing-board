<script lang="ts">
	import { offset, scale, scaleOffset } from "$lib/stores";
    import type { Point } from "$lib/types";
	import { Layer, type Render } from "svelte-canvas";

    export let color: string = "black";
    export let lineWidth: number = 0;

    export let points: Point[] = [];

    let render: Render;

    $: render = ({context}) => {
        context.save();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        context.setTransform($scale, 0, 0, $scale, $offset[0] * $scale - $scaleOffset[0], $offset[1] * $scale - $scaleOffset[1]);
        context.moveTo(...points[0]);
        for (let i = 0; i < points.length; i++) {
            const element = points[i];
            context.lineTo(...element);
        }
        context.stroke(); 
        context.restore();
    };

</script>

<Layer {render}/>