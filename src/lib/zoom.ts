import { scale } from "$lib/stores";

export function onZoom(delta: number) {
    scale.update(value => Math.min(Math.max(value + delta, 0.1), 5));
}