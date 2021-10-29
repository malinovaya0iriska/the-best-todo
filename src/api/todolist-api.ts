
import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9f225800-9b44-4745-b381-d436ad2be4a7'
    }
})

//api
// в результате запроса на сервер API возвращается промисс
export const todolistAPI = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

//types
export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}
export type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}