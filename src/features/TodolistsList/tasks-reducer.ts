import {addTodoAC, removeTodoAC, setTodosAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {ModelType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";
import {TasksType} from "../../app/App";
import {AppRootStateType} from "../../app/store";
import {TodoType} from "../../api/todolist-api";

const initialState: TasksType = {}
export const tasksReducer = (state = initialState, action: ActionTasksType): TasksType => {
    switch (action.type) {
        case 'SET-TODOS':
            const copyState = {...state}
            action.todos.forEach((tl: TodoType) => {
                copyState[tl.id] = []
            })
            return copyState;
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...state};
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        default:
            return state
    }
}
//actions
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)
export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)


//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionTasksType>) => {
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTasksTC = (id: string, todolistId: string) => (dispatch: Dispatch<ActionTasksType>) => {
    taskAPI.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionTasksType>) => {
    taskAPI.addTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionTasksType>, getState: () => AppRootStateType) => {

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
                dispatch(updateTaskAC(taskId, model, todolistId))
            })
        }
    }

//types
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