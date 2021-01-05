import { configureStore } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { RootState } from './rootReducer'
import { ThunkAction } from 'redux-thunk'
import rootReducer from './rootReducer'

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default store