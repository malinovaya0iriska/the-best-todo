import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistAPI, TodoType} from "../api/todolist-api";

export type ActionTodosType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodosAC>


export type TodolistDomainType = TodoType & {
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionTodosType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(todo => ({...todo, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
export const setTodosAC = (todos: TodoType[]) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}
export const removeTodoAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}
export const addTodoAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    } as const
}
export const changeTodoTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}
export const changeTodoFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}
