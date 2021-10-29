import {Dispatch} from "redux";
import {todolistAPI, TodoType} from "../../api/todolist-api";
import {ActionAppType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionTodosType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'succeeded'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'succeeded'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}
//actions
export const setTodosAC = (todos: TodoType[]) => ({type: 'SET-TODOS', todos} as const)
export const removeTodoAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodoAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodoTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodoFilterAC = (id: string, filter: FilterType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)

//thunk
export const fetchTodosTC = () => (dispatch: Dispatch<ActionTodosType | ActionAppType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionTodosType | ActionAppType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.addTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodoTC = (todolistId: string) => (dispatch: Dispatch<ActionTodosType | ActionAppType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionTodosType | ActionAppType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
export type ActionTodosType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = TodoType & {
    filter: FilterType,
    entityStatus: RequestStatusType,
}
export type FilterType = 'all' | 'active' | 'completed'
