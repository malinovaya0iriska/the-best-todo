import React, {useState} from "react";
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
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('')

    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onAddTaskClickHandler = () => {
        props.addTask(title, props.id)
        setTitle('')
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            <input onChange={onTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}/>
            <button onClick={onAddTaskClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks
                .map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
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