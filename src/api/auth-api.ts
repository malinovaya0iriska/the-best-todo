import {instance, ResponseType} from "./todolist-api";

export type LoginParamsType = {
    email: string
    passsword: string
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    logIn(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, data)
    },
    me() {
        return instance.get<ResponseType<{id: number,email: string,login: string}>>(`auth/me`, )
    },
}