<script lang="ts">
	import { RangeSlider, FileButton, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { drawSelection, options, lineWidth, lineColor, scale, drawnObjects, backgroundCanvas } from "$lib/stores";
    import ColorPicker from "svelte-awesome-color-picker";
	import ColorPickerWrapper from "$lib/components/ColorPickerWrapper.svelte";
    import { Circle, Download, Minus, Move, Pencil1, Plus, Square, Upload } from "radix-icons-svelte";
	import { onZoom } from "$lib/zoom";
    import type { DrawnObject } from "$lib/types";
	import CanvasImage from "$lib/components/CanvasImage.svelte";
    
    let files: FileList;

    let sliderMax = 25;

    function saveCanvasImage() {
        const link = document.createElement("a");
        link.download = "canvas.png";
        link.href = $backgroundCanvas.getCanvas().toDataURL("image/png");
        link.click()
    }

    function selectImageFile() {
        const newImage: DrawnObject = {
			component: CanvasImage,
            props: {
                imageUrl: URL.createObjectURL(files[0])
            }
		}

        $drawnObjects.push(newImage);
        $drawnObjects = $drawnObjects;
    }

</script>

<div class="container mx-auto flex flex-row justify-center items-center gap-5">
    <RangeSlider name="range-slider" bind:value={$lineWidth} max={25} step={1} ticked>
	    <div class="flex justify-between items-center">
		    <div class="font-bold">Size</div>
		    <div class="text-xs">{$lineWidth} / {sliderMax}</div>
	    </div>
    </RangeSlider>
    <div class="flex gap-6 p-3 variant-filled">
        <button type="button" class="btn-icon btn-icon-sm" on:click={() => onZoom(-0.1)}>
            <Minus />
        </button>
        <button type="button" class="btn-icon btn-icon-sm" on:click={() => onZoom(0.1)}>
            <Plus />
        </button>
        <button type="button" class="btn btn-sm" on:click={() => scale.set(1)}>
            {new Intl.NumberFormat("en-GB", { style: "percent"}).format($scale)}
        <button/>
    </div>
    <ColorPicker label="" bind:hex={$lineColor} isAlpha={false} canChangeMode={false} components={{wrapper: ColorPickerWrapper}} /> 
    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" background="variant-filled-secondary">
        <RadioItem bind:group={$drawSelection} name="paint" value={options[0]}>
            <Pencil1 />
        </RadioItem>
        <RadioItem bind:group={$drawSelection} name="rectangle" value={options[1]}>
            <Square />
        </RadioItem>
        <RadioItem bind:group={$drawSelection} name="circle" value={options[2]}>
            <Circle />
        </RadioItem>
        <RadioItem bind:group={$drawSelection} name="pan" value={options[3]}>
            <Move />
        </RadioItem>
    </RadioGroup>
    <div class="flex gap-2 p-3">
        <FileButton button="btn btn-md variant-filled-secondary" accept="image/png, image/jpeg" name="files" bind:files={files} on:change={selectImageFile}>
            <Upload />
        </FileButton>
        <button class="btn btn-md variant-filled-primary" on:click={saveCanvasImage}>
            <Download />
        </button>
    </div>
</div>
