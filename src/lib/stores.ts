import { writable, type Writable } from "svelte/store";
import Paint from "$lib/components/Paint.svelte";
import Rectangle from "$lib/components/Rectangle.svelte";
import Circle from "$lib/components/Circle.svelte";
import type { DrawnObject, DrawOption, Point} from "$lib/types";
import type { Canvas } from "svelte-canvas";

export const lineWidth: Writable<number> = writable(10);

export const lineColor: Writable<string> = writable("#000000");

export const normalBackgroundCanvas: Writable<HTMLCanvasElement> = writable();
export const backgroundCanvas: Writable<Canvas> = writable();

export const offset: Writable<Point> = writable([0, 0]);
export const scaleOffset: Writable<Point> = writable([0, 0]);
export const scale: Writable<number> = writable(1);

export const dragging: Writable<boolean> = writable(false);
export const clearFrames: Writable<boolean> = writable(false);

export const drawnObjects: Writable<DrawnObject[]> = writable([]);

export const options = [
    {
        value: "Paint",
        component: Paint
    },
    {
        value: "Rectangle",
        component: Rectangle
    },
    {
        value: "Circle",
        component: Circle
    },
    {
        value: "Pan"
    }
]

export const drawSelection: Writable<DrawOption> = writable(options[0]);