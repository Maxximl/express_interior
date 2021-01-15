import { combineReducers } from '@reduxjs/toolkit'
import { elementsReducer } from "./reducers/elements/elements.slice";
import { roomReducer } from "./reducers/room/room.slice";

export const rootReducer = combineReducers({
    elements: elementsReducer,
    room: roomReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer