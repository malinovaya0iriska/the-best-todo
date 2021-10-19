import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('')


    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onAddTaskClickHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else setError('Heading is required!')
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed', props.id)

    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.id)
    }
    return <div>
        <h3>
            <button onClick={onRemoveTodoHandler}>X</button>
            {props.title}</h3>

        <div>
            <input className={error ? 'error' : ''}
                   onChange={onTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}
            />
            <button onClick={onAddTaskClickHandler}>+</button>
        </div>

        {error && <div className={'error'}>{error}</div>}

        <ul>
            {props.tasks
                .map(task => {
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        return <li key={task.id} className={task.isDone? 'is-done': ''}>
                            <Button title={'x'} onClickHandler={onClickHandler}/>
                            <input type={'checkbox'} onChange={onChangeTaskStatus} checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    }
                )}
        </ul>
        <div>
            <Button style={props.filter === 'all'} title={'All'} onClickHandler={onAllClickHandler}/>
            <Button style={props.filter === 'active'} title={'Active'} onClickHandler={onActiveClickHandler}/>
            <Button style={props.filter === 'completed'} title={'Completed'} onClickHandler={onCompleteClickHandler}/>

        </div>
    </div>
}