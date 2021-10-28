import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/tasks-api";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button/Button";
import {Task} from "./Task/Task";
import {FilterType} from "../todolists-reducer";
import {addTaskTC, fetchTasksTC} from "../tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../../../app/app-reducer";
import {AppRootStateType} from "../../../app/store";
import {TasksDomainType} from "../../../app/App";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    entityStatus: RequestStatusType
    changeFilter: (filter: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodoTitle: (newTitle: string, id: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {
        const tasks = useSelector<AppRootStateType, TasksDomainType[]>(state => state.tasks[props.id])
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(fetchTasksTC(props.id))
        }, [])

        let tasksForTodolist = tasks
        if (props.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(flt => flt.status === TaskStatuses.New)
        }

        if (props.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(flt => flt.status === TaskStatuses.Completed)
        }
        const addTask = useCallback((title: string) => {
            dispatch(addTaskTC(title, props.id))
        }, [props.id])

        const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
        const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
        const onCompleteClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

        const onRemoveTodoHandler = () => {
            props.removeTodolist(props.id)
        }
        const changeTodoTitleHandler = useCallback((newTitle: string) => props.changeTodoTitle(newTitle, props.id), [props.changeTodoTitle, props.id])

        return <div>
            <h3>
                <EditableSpan value={props.title} disabled={props.entityStatus === 'loading'}
                              onChange={changeTodoTitleHandler}/>
                <IconButton onClick={onRemoveTodoHandler} disabled={props.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>

            <ul>
                {tasksForTodolist
                    .map(task => <Task key={task.id}
                                       task={task}
                                       todolistId={props.id}
                        />
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
)