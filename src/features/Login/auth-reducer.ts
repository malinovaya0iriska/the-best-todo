import {authAPI, LoginParamsType} from "../../api/auth-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsAuthType): InitialStateType => {
    switch (action.type) {
         case 'AUTH/SET-IS-LOGGED-IN':
             return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value})

//thunks
export const logInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
type ActionsAuthType = ReturnType<typeof setIsLoggedInAC>