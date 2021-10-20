import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodoAC, removeTodoAC} from "./todolists-reducer";

type ActionTasksType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof removeTodoAC>


export const tasksReducer = (state: TasksType, action: ActionTasksType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newTasks = state[action.todolistId]
            let filteredTasks = newTasks.filter(t => t.id !== action.id)
            return {...state, [action.todolistId]: filteredTasks};
        case 'ADD-TASK':
            let tasks = state[action.todolistId]
            let addedTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks]
            return {...state, [action.todolistId]: addedTasks};
        case 'CHANGE-TASK-STATUS':
            let changingTasks = state[action.todolistId]
            let checkedTasks = changingTasks.map(tl => tl.id === action.id ? {...tl, isDone: action.isDone} : tl)
            return {...state, [action.todolistId]: checkedTasks};
        case 'CHANGE-TASK-TITLE':
            let renamingTasks = state[action.todolistId]
            let changedTasks = renamingTasks.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            return {...state, [action.todolistId]: changedTasks}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []};
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistId
    } as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        title,
        todolistId
    } as const
}