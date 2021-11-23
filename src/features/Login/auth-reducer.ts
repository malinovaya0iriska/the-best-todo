import {authAPI, LoginParamsType} from "../../api/auth-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
//type InitialStateType = typeof initialState

// внутри происходит разбивание еще на более мелкие редьюсеры
// автоматически приходит черновик-копия стейта, которую мы меняем,
// сохраняя иммутабельный первоначальный стейт
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
            stateDraft.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
/*(state: InitialStateType = initialState, action: ActionsAuthType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}*/

//actions
//export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value})
export const {setIsLoggedInAC} = slice.actions

//thunks
export const logInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC({status:'failed'}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
//type ActionsAuthType = ReturnType<typeof setIsLoggedInAC>