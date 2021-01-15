import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICreateRoom, IRoomState, ISetMaterial } from './room.types'

const initialState: IRoomState = {
    walls: {}
};


const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        createRoom(state, action: PayloadAction<ICreateRoom>) {
            const { walls } = action.payload;
            state.walls = walls;
        },
        setMaterial(state, action: PayloadAction<ISetMaterial>) {
            const { id, path } = action.payload;
            if (id in state.walls) {
                state.walls[id].pathToMaterial = path
            }
        }
    }
})


export const roomSliceActions = roomSlice.actions;
export const roomReducer = roomSlice.reducer; 