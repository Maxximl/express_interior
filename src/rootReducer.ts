import { combineReducers } from '@reduxjs/toolkit'
import { elementsReducer } from "./reducers/elements.slice";

export const rootReducer = combineReducers({
    elements: elementsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer