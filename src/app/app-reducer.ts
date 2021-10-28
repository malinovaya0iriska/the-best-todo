export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

//types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type ActionAppType = SetAppStatusActionType | SetAppErrorActionType

