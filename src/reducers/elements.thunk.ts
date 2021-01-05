import { elementsSliceActions } from "./elements.slice"
import { AppDispatch, AppThunk } from "../store";
import { nanoid } from "nanoid";
import { Vector } from "./elements.types";

export const addElement = (name: string, path: string, position: Vector, selected: boolean = false) => (dispatch: AppDispatch) => {
    const id = nanoid(10);
    dispatch(elementsSliceActions.addElement({ id, name, path, selected, position }));
}

export const setSelectedId = (id: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(elementsSliceActions.setSelectedId({ id }));
}

export const setPosition = (id: string, position: Vector): AppThunk => (dispatch: AppDispatch) => {
    if (id && position) {
        dispatch(elementsSliceActions.setPosition({ id, position }))

    }
}