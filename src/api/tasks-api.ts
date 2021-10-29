import {instance, ResponseType} from "./todolist-api";


type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    addedDate: string
    deadline: string | null
    description: null | string
    id: string
    order: number
    priority: TaskPriorities
    startDate: null | string
    status: TaskStatuses
    title: string
    todoListId: string
}
export type ModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: ModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}