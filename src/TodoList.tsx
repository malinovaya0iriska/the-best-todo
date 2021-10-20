import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";

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
            <EditableSpan value={props.title} onChange={changeTodoTitleHandler}/>
            <IconButton onClick={onRemoveTodoHandler}><Delete/></IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {props.tasks
                .map(task => {
                        const changeTaskTitleHandler = (newTitle: string) => props.changeTaskTitle(newTitle, task.id, props.id)
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={task.isDone}
                                color={"secondary"}
                                onChange={onChangeTaskStatus}
                            />
                            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                            <IconButton onClick={onClickHandler}><Delete/></IconButton>
                        </li>
                    }
                )}
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompleteClickHandler}
                    color={'secondary'}>Completed
            </Button>

        </div>
    </div>
}