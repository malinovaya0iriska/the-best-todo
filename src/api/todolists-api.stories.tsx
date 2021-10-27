import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "./todolist-api";

export default {
    title: 'API/ToDos'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodos()
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    // десериализация массива тудулистов в строку
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const OnClickHandler = () => {
        todolistAPI.addTodo(title)
            .then(res => {
                debugger
                setState(setState(title))
            })
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value ={title} placeholder={'Task title'} onChange={onChangeHandler}/>
            <button onClick={OnClickHandler}>ADD ==ToDoList=</button>
        </div>
    </>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const OnClickHandler = () => {
        todolistAPI.deleteTodo(todolistId).then(res => {
            debugger
            setState(res.data)
        })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'}value={todolistId} placeholder={'todolistId'} onChange={onChangeHandler}/>
            <button onClick={OnClickHandler}>DELETE ==ToDoList=</button>
        </div>
    </>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const OnClickHandler = () => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then(res => {
                debugger
                setState(res.data)
            })
    }
    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value={title} onChange={onChangeTitleHandler} placeholder={'title'}/>
            <input type={'text'} value={todolistId} onChange={onChangeIDHandler} placeholder={'todolistId'}/>
            <button onClick={OnClickHandler}>UPDATE ==ToDoList=</button>
        </div>
    </>
}




