import { Vector3 } from "three";

export interface IElement {
    id: string;
    name: string;
    path: string;
    selected: boolean;
    position: Vector;
}

export interface IElements {
    [id: string]: IElement;

}

export type IElementState = {
    elements: IElements;
    selectedId?: string;
}



export interface IAddElement {
    id: string;
    name: string;
    path: string;
    selected: boolean;
    position: Vector;
}

export interface ISetSelectedId {
    id: string;
}

export interface Vector { x: number, y: number, z: number };

export interface ISetPosition {
    id: string;
    position: Vector;
}