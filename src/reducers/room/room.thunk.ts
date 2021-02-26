import { AppDispatch, AppThunk } from "../../store";
import { roomSliceActions } from "./room.slice";
import { IWalls } from "./room.types";

export const createRoom = (): AppThunk => (dispatch: AppDispatch) => {
    const walls: IWalls = {};
    walls["backWall"] = {
        elementId: "backWall",
        pathToMaterial: "",
        width: 2,
        height: 1,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    }
    walls["rightWall"] = {
        elementId: "rightWall",
        pathToMaterial: "",
        width: 2,
        height: 1,
        position: { x: 1, y: 0, z: 1 },
        rotation: { x: 0, y: Math.PI * 1.5, z: 0 }
    }
    walls["leftWall"] = {
        elementId: "leftWall",
        pathToMaterial: "",
        width: 2,
        height: 1,
        position: { x: -1, y: 0, z: 1 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }
    walls["floor"] = {
        elementId: "floor",
        pathToMaterial: "",
        width: 2,
        height: 3,
        position: { x: 0, y: -0.5, z: 0.5 },
        rotation: { x: Math.PI / 2, y: 0, z: 0 }
    }
    walls["roof"] = {
        elementId: "roof",
        pathToMaterial: "",
        width: 2,
        height: 3,
        position: { x: 0, y: 0.5, z: 0.5 },
        rotation: { x: Math.PI / 2, y: 0, z: 0 }
    }
    dispatch(roomSliceActions.createRoom({ walls }))

}

export const setMaterial = (id: string, path: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(roomSliceActions.setMaterial({ id, path }))
}