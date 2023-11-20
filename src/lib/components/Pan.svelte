<script lang="ts">
	import { offset } from "$lib/stores";
	import { Layer, type Render } from "svelte-canvas";
	
	let render: Render;

	$: render = ({ context }) => {
        context.save();
        context.setTransform(1, 0, 0, 1, ...$offset);
       
        context.restore();
	};
	
</script>

<Layer {render} />