<script lang="ts">
    export let wrapper: HTMLDivElement;
    export let isOpen: boolean;
    export let isPopup: boolean;
</script>

<div
    class="wrapper w-max px-2 py-2 bg-primary-500 text-black rounded-lg hidden"
    bind:this={wrapper}
    class:isOpen
    class:isPopup
    aria-label="color picker"
>
    <slot />
</div>

<style>
	.isOpen {
		display: block;
	}

    .isPopup {
		position: absolute;
		bottom: 100px;
        left: -100px;
	}
</style>