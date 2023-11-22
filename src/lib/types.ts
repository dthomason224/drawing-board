import type { SvelteComponent } from "svelte";

export type Point = [number, number];

export interface DrawOption {
    value: string;
    component?: typeof SvelteComponent<any>;
}

export interface DrawnObject {
    component: typeof SvelteComponent<any>;
    props: {
        startPoint?: Point;
        endPoint?: Point;
        color?: string;
        lineWidth?: number;
        radius?: number;
        points?: Point[];
        imageUrl?: string;
    };
}