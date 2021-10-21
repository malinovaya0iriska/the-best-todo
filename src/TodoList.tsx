import React, {useCallback} from "react";
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button/Button";
import {Task} from "./Task";

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

export const TodoList = React.memo(function (props: TodoListPropsType) {
        let tasksForTodolist = props.tasks
        if (props.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(flt => !flt.isDone)
        }

        if (props.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(flt => flt.isDone)
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
                <IconButton onClick={onRemoveTodoHandler}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

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