import {Dispatch} from "redux";
import {todolistAPI, TodoType} from "../../api/todolist-api";

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionTodosType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(todo => ({...todo, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
//actions
export const setTodosAC = (todos: TodoType[]) => ({type: 'SET-TODOS', todos} as const)
export const removeTodoAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodoAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodoTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodoFilterAC = (id: string, filter: FilterType) => ({type: 'CHANGE-TODOLIST-FILTER',id, filter} as const)

//thunk
export const fetchTodosTC = () => (dispatch: Dispatch<ActionTodosType>) => {
    todolistAPI.getTodos()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionTodosType>) => {
    todolistAPI.addTodo(title)
        .then(res => {
            dispatch(addTodoAC(res.data.data.item))
        })
}
export const removeTodoTC = (todolistId: string) => (dispatch: Dispatch<ActionTodosType>) => {
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            dispatch(removeTodoAC(todolistId))
        })
}
export const changeTodoTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionTodosType>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then(res => {
            dispatch(changeTodoTitleAC(todolistId,title))
        })
}

//types
export type ActionTodosType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodosAC>

export type TodolistDomainType = TodoType & {
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
