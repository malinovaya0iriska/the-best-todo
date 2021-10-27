import {v1} from "uuid";
import {addTodoAC, removeTodoAC, setTodosAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {ModelType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {TasksType} from "../App";
import {AppRootStateType} from "./store";
import {TodoType} from "../api/todolist-api";

type ActionTasksType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const initialState: TasksType = {}
export const tasksReducer = (state = initialState, action: ActionTasksType): TasksType => {
    switch (action.type) {
        case 'SET-TODOS':
            const copyState = {...state}
            action.todos.forEach((tl:TodoType) => {
                copyState[tl.id] = []
            })
            return copyState;
        case 'SET-TASKS':
            const tasksCopy = {...state}
            tasksCopy[action.todolistId] = action.tasks
            return tasksCopy
        case 'REMOVE-TASK':
            let newTasks = state[action.todolistId]
            let filteredTasks = newTasks.filter(t => t.id !== action.id)
            return {...state, [action.todolistId]: filteredTasks};
        case 'ADD-TASK':
            let tasks = state[action.task.todoListId]
            let addedTasks = [action.task, ...tasks]
            return {...state, [action.task.todoListId]: addedTasks};
        case 'UPDATE-TASK':
            return{
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {[action.todolistId]: [], ...state};
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        default:
            return state
    }
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        model,
        todolistId,
        taskId
    } as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTasksTC = (id: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todolistId, id)
            .then((res) => {
                dispatch(removeTaskAC(id, todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.addTask(todolistId, title)
            .then((res) => {
                debugger
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: ModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task?.startDate,
            title: task.title,
            status: task.status,
            ...model
        }
        if (task) {
            taskAPI.updateTask(todolistId, taskId, apiModel).then(() => {
                debugger
                dispatch(updateTaskAC(taskId, model, todolistId))
            })
        }
    }
}
