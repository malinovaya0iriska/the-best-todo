import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskStatuses} from "../../../../api/tasks-api";
import {removeTasksTC, updateTaskTC} from "../../tasks-reducer";
import {useDispatch} from "react-redux";
import {TasksDomainType} from "../../../../app/App";


type PropsTypes = {
    task: TasksDomainType
    todolistId: string
}

export const Task: React.FC<PropsTypes> = React.memo((props) => {
    const dispatch = useDispatch()

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(props.task.id, props.todolistId, {status}))
    }

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(props.task.id, props.todolistId, {title},))
    }, [dispatch])

    const removeTask = useCallback(() => {
        dispatch(removeTasksTC(props.task.id, props.todolistId))
    }, [dispatch])

    return (
        <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color={"secondary"}
                onChange={onChangeTaskStatus}
            />
            <EditableSpan value={props.task.title} disabled={props.task.entityStatus === 'loading'}
                          onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}><Delete/></IconButton>
        </li>
    )
})

