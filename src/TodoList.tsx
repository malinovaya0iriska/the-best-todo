import React, {useState} from "react";
import {FilterType, TasksType} from "./App";
import {Button} from "./Button";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('')

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onAddTaskClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTaskClickHandler()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompleteClickHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}/>
            <button onClick={onAddTaskClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks
                .map(task => {
                        const onClickHandler = () => props.removeTask(task.id)
                        return <li key={task.id}>
                            <Button title={'x'} onClickHandler={onClickHandler}/>
                            <input type={'checkbox'} checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    }
                )}
        </ul>
        <div>
            <Button title={'All'} onClickHandler={onAllClickHandler}/>
            <Button title={'Active'} onClickHandler={onActiveClickHandler}/>
            <Button title={'Completed'} onClickHandler={onCompleteClickHandler}/>
        </div>
    </div>
}