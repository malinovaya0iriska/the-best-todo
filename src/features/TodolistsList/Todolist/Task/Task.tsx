import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";


type PropsTypes = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (newTitle: string, id: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}

export const Task: React.FC<PropsTypes> = React.memo((props) => {
    const changeTaskTitleHandler = useCallback((newTitle: string) =>
        props.changeTaskTitle(newTitle, props.task.id, props.todolistId), [props.changeTaskTitle, props.task.id, props.todolistId])

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)

    return (
        <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color={"secondary"}
                onChange={onChangeTaskStatus}
            />
            <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler}/>
            <IconButton onClick={onClickHandler}><Delete/></IconButton>
        </li>
    )
})

