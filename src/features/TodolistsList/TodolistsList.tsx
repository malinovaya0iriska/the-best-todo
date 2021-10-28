import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoTC,
    changeTodoFilterAC,
    changeTodoTitleTC,
    fetchTodosTC,
    FilterType,
    removeTodoTC,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTasksTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import Grid from "@mui/material/Grid/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper/Paper";
import {TodoList} from "./Todolist/TodoList";
import {TasksType} from "../../app/App";

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodoFilterAC(todolistId, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoTC(title))
    }, [dispatch])
    const changeTodoTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodoTitleTC(id, title))
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTasksTC(id, todolistId))
    }, [dispatch])
    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {status},))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, id: string, todolistId: string) => {
        dispatch(updateTaskTC(id, todolistId, {title},))
    }, [dispatch])

    return (
        <>
            <Grid container style={{padding: '30px 0'}}>
                <AddItemForm addItem={addTodolist} disabled={false}/>
            </Grid>
            <Grid container spacing={10}>
                {todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '25px 45px'}}
                               elevation={5}>
                            <TodoList
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                entityStatus={tl.entityStatus}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTodoTitle={changeTodoTitle}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}