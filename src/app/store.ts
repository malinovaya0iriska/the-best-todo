import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
// @ts-ignore
//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

