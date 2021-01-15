import { IVector } from "../elements/elements.types";

export interface IWalls {
    [elementId: string]: IWall;
}


export interface IRoomState {
    walls: IWalls
}

export interface IWall {
    elementId: string;
    pathToMaterial: string;
    width: number;
    height: number;
    position: IVector;
    rotation: IEuler
}

export interface ICreateRoom {
    walls: IWalls
}

export interface IEuler {
    x: number;
    y: number;
    z: number;
}

export interface ISetMaterial {
    id: string;
    path: string;
}