import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAddElement, IDeleteElement, IElementState, ISetPosition, ISetSelectedId } from './elements.types'

const initialState: IElementState = {
    elements: {}
};


const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {
        addElement(state, action: PayloadAction<IAddElement>) {
            const { id, name, path, selected, position } = action.payload;
            state.elements[id] = { id, name, path, selected, position };
        },
        setSelectedId(state, action: PayloadAction<ISetSelectedId>) {
            const { id } = action.payload;
            state.selectedId = id;
        },
        setPosition(state, action: PayloadAction<ISetPosition>) {
            const { id, position } = action.payload;
            state.elements[id] = { ...state.elements[id], position };
        },
        deleteElement(state, action: PayloadAction<IDeleteElement>) {
            const { id } = action.payload;
            for (const elementId in state.elements) {
                if (elementId === id) {
                    delete state.elements[id]
                }

            }
        }
    }
})


export const elementsSliceActions = elementsSlice.actions;
export const elementsReducer = elementsSlice.reducer; 