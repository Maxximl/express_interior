import { elementsSliceActions } from "./elements.slice"
import { AppDispatch, AppThunk } from "../../store";
import { nanoid } from "nanoid";
import { IVector } from "./elements.types";

export const addElement = (name: string, path: string, position: IVector, scale: IVector, selected: boolean = false): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
    const id = nanoid(10);
    dispatch(elementsSliceActions.addElement({ id, name, path, selected, position, scale, data: "" }));
}

export const addExternalElement = (name: string, path: string, url: string, position: IVector, scale: IVector, selected: boolean = false): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
    const id = nanoid(10);
    let data;
    if (url) {
        const response = await fetch("/api/download", { method: "POST", body: JSON.stringify({ url }), headers: { 'Content-Type': 'application/json' } });
        data = await response.json();
    }
    dispatch(elementsSliceActions.addElement({ id, name, path, selected, position, scale, data: data.data }));
}

export const setSelectedId = (id: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(elementsSliceActions.setSelectedId({ id }));
}

export const setPosition = (id: string, position: IVector): AppThunk => (dispatch: AppDispatch) => {
    if (id && position) {
        dispatch(elementsSliceActions.setPosition({ id, position }))

    }
}

export const deleteElement = (id: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(elementsSliceActions.deleteElement({ id }));
}

export const setScale = (id: string, scale: IVector): AppThunk => (dispatch: AppDispatch) => {
    dispatch(elementsSliceActions.setScale({ id, scale }));
}