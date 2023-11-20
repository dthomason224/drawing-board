<script lang="ts">
	import { popup, TreeView, type PopupSettings, TreeViewItem, RangeSlider } from "@skeletonlabs/skeleton";
	import { drawSelection, options, lineWidth, lineColor } from "$lib/stores";
    import ColorPicker from "svelte-awesome-color-picker";
	import ColorPickerWrapper from "$lib/components/ColorPickerWrapper.svelte";

    let sliderMax = 25;

    const popupMenu: PopupSettings = {
        event: "click",
        target: "popupMenu",
        placement: "top",
        middleware: {
            offset: 24
        }
    };

</script>

<div class="container mx-auto flex flex-row justify-center gap-5">
    <ColorPicker bind:hex={$lineColor} canChangeMode={false} components={{wrapper: ColorPickerWrapper}} /> 
    <div class="flex gap-2 p-3">
        <button class="btn btn-md variant-filled-primary" use:popup={popupMenu}>shape</button> 
    </div>
    <div class="flex gap-2 p-3">
        <button class="btn btn-md variant-filled-primary">upload</button>
        <button class="btn btn-md variant-filled-primary">download</button>
    </div>
    <div class="flex gap-2 p-3">
        <button class="btn btn-md variant-filled-primary">save</button>
        <button class="btn btn-md variant-filled-primary">account</button>
    </div>
</div>

<div class="card p-4 variant-filled-primary" data-popup="popupMenu">
    <TreeView selection hyphenOpacity="opacity-0" indent="ml-0">
	    <TreeViewItem>
		    {$drawSelection.value} 
		    <svelte:fragment slot="children">
			    <TreeViewItem bind:group={$drawSelection} name="paint"  value={options[0]}>
				    Paint
			    </TreeViewItem>
                <TreeViewItem bind:group={$drawSelection} name="rectangle"  value={options[1]}>
				    Rectangle
			    </TreeViewItem>
                <TreeViewItem bind:group={$drawSelection} name="circle"  value={options[2]}>
				    Circle
			    </TreeViewItem>
                <TreeViewItem bind:group={$drawSelection} name="pan"  value={options[3]}>
				    Pan
			    </TreeViewItem>
		    </svelte:fragment>
	    </TreeViewItem>
    </TreeView>
    <RangeSlider name="range-slider" bind:value={$lineWidth} max={25} step={1} ticked>
	    <div class="flex justify-between items-center">
		    <div class="font-bold">Size</div>
		    <div class="text-xs">{$lineWidth} / {sliderMax}</div>
	    </div>
    </RangeSlider>
	<div class="arrow variant-filled-primary" />
</div>