
export interface IElement {
    id: string;
    name: string;
    path: string;
    selected: boolean;
    position: IVector;
    scale: IVector;
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
    position: IVector;
    scale: IVector;
}

export interface ISetSelectedId {
    id: string;
}

export interface IVector { x: number, y: number, z: number };

export interface ISetPosition {
    id: string;
    position: IVector;
}

export interface IDeleteElement {
    id: string;
}

export interface ISetScale {
    id: string;
    scale: IVector;
}