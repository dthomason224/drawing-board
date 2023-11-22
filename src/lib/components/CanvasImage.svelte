<script lang="ts">
	import { backgroundCanvas, offset, scale, scaleOffset } from "$lib/stores";
	import { onMount } from "svelte";
	import { Layer, type Render } from "svelte-canvas";

    export let imageUrl: string;

    let img: HTMLImageElement;
    let imgComplete: boolean = false;

    let render: Render;

    onMount(() => {
		img = new Image();
        img.src = imageUrl;
        img.onload = function() {
            $backgroundCanvas.redraw();
        }   
	});

    $: render = ({ context }) => {
        context.save();
        context.setTransform($scale, 0, 0, $scale, $offset[0] * $scale - $scaleOffset[0], $offset[1] * $scale - $scaleOffset[1]);
        context.drawImage(img, 0, 0);
        context.restore();
    }
</script>

<Layer {render} />