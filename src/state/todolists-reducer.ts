import {FilterType, TodoType} from "../App";
import {v1} from "uuid";

type ActionType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>


export const todolistsReducer = (state: TodoType[], action: ActionType): TodoType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
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
        title
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