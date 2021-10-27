import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import AppBar from "@mui/material/AppBar/AppBar";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    fetchTodolistsTC,
    FilterType,
    removeTodoAC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/tasks-api";

export type TasksType = {
    [key: string]: TaskType []
}

export function App() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTodoFilterAC(todolistId, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoAC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoAC(title))
    }, [dispatch])
    const changeTodoTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodoTitleAC(id, title))
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
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button variant={'outlined'} color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '30px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
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
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}



