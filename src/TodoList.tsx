import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTodoTitle: (newTitle: string, id: string) => void
    changeTaskTitle: (newTitle: string, id: string, todolistId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)

    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed', props.id)

    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoTitleHandler = (newTitle: string) => props.changeTodoTitle(newTitle, props.id)

    return <div>
        <h3>
            <button onClick={onRemoveTodoHandler}>X</button>
            <EditableSpan value={props.title} onChange={changeTodoTitleHandler}/></h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {props.tasks
                .map(task => {
                        const changeTaskTitleHandler = (newTitle: string) => props.changeTaskTitle(newTitle, task.id, props.id)
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Button title={'x'} onClickHandler={onClickHandler}/>
                            <input type={'checkbox'} onChange={onChangeTaskStatus} checked={task.isDone}/>
                            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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