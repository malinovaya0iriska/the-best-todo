import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}
/*type InitialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}*/

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(stateDraft, action: PayloadAction<{ status: RequestStatusType }>) {
            stateDraft.status = action.payload.status
        },
        setAppErrorAC(stateDraft, action: PayloadAction<{ error: null | string }>) {
            stateDraft.error = action.payload.error
        },
        setAppInitializedAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
            stateDraft.isInitialized = action.payload.value
        },
    }
})

export const appReducer = slice.reducer

/*(state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}*/

//actions
/*
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
*/

export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions
//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        } else {
            dispatch(setIsLoggedInAC({value: false}))
        }
        dispatch(setAppInitializedAC({value: true}))
    })
}
//types
/*
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type ActionAppType = SetAppStatusActionType | SetAppErrorActionType | setAppInitializedActionType
*/

