import {ChangeEvent, useState} from "react";
import {taskAPI} from "../api/tasks-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onChangeIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const OnClickHandler = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    // десериализация массива тасок в строку
    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value={todolistId} onChange={onChangeIDHandler} placeholder={'todolistId'}/>
            <button onClick={OnClickHandler}>GET ==TASK=</button>
        </div>
    </>
}

export const CreateTask = () => {
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
        taskAPI.addTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value={title} onChange={onChangeTitleHandler} placeholder={'Task title'}/>
            <input type={'text'} value={todolistId} onChange={onChangeIDHandler} placeholder={'todolistId'}/>
            <button onClick={OnClickHandler}>ADD ==TASK=</button>
        </div>
    </>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const onChangeTASKHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTODOIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const OnClickHandler = () => {
        taskAPI.deleteTask(todolistId, taskId).then(res => {
            setState(res.data)
        })
    }

    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value={taskId} onChange={onChangeTASKHandler} placeholder={'Task ID'}/>
            <input type={'text'} value={todolistId} onChange={onChangeTODOIDHandler} placeholder={'Todolist ID'}/>
            <button onClick={OnClickHandler}>DELETE ==TASK=</button>
        </div>
    </>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [description, setDescription] = useState<string>('description 1')
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeTASKHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTODOIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const OnClickHandler = () => {
        const model = {
            addedDate: "2021-09-23T17:18:24.077",
            deadline: null,
            id: taskId,
            order: -4,
            startDate: null,
            todoList: null,
            todoListId: todolistId,
            title: title,
            description: description,
            status: 1,
            priority: priority,
        }
        taskAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                setState(res.data)
            })
    }

    return <>
        <div> {JSON.stringify(state)}</div>
        <div>
            <input type={'text'} value={title} onChange={onChangeTitleHandler} placeholder={'Task title'}/>
            <input type={'text'} value={taskId} onChange={onChangeTASKHandler} placeholder={'Task ID'}/>
            <input type={'text'} value={todolistId} onChange={onChangeTODOIDHandler} placeholder={'Todolist ID'}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'status'} value={status} type="number" onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'priority'} value={priority} type="number" onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            <button onClick={OnClickHandler}>UPDATE ==TASK=</button>
        </div>
    </>
}