import React, {useCallback, useEffect} from "react";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button/Button";
import {Task} from "./Task/Task";
import {FilterType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodoTitle: (newTitle: string, id: string) => void
    changeTaskTitle: (newTitle: string, id: string, todolistId: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(fetchTasksTC(props.id))
        }, [])
        let tasksForTodolist = props.tasks
        if (props.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(flt => flt.status === TaskStatuses.New)
        }

        if (props.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(flt => flt.status === TaskStatuses.Completed)
        }
        const addTask = useCallback((title: string) => {
            props.addTask(title, props.id)

        }, [props.addTask, props.id])

        const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
        const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
        const onCompleteClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

        const onRemoveTodoHandler = () => {
            props.removeTodolist(props.id)
        }
        const changeTodoTitleHandler = useCallback((newTitle: string) => props.changeTodoTitle(newTitle, props.id), [props.changeTodoTitle, props.id])

        return <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodoTitleHandler}/>
                <IconButton onClick={onRemoveTodoHandler} disabled={props.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>

            <ul>
                {tasksForTodolist
                    .map(task => <Task key={task.id}
                                       task={task}
                                       todolistId={props.id}
                                       removeTask={props.removeTask}
                                       changeTaskStatus={props.changeTaskStatus}
                                       changeTaskTitle={props.changeTaskTitle}
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