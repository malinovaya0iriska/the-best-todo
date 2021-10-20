import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar/AppBar";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TasksType = {
    [key: string]: TaskType []
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeFilter = (filter: FilterType, todolistId: string) => {
        dispatch(changeTodoFilterAC(todolistId, filter))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodoAC(todolistId))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodoAC(title))
    }
    const changeTodoTitle = (title: string, id: string) => {
        dispatch(changeTodoTitleAC(id, title))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeTaskTitle = (title: string, id: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }

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
                        let tasksForTodolist = tasks[tl.id]

                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(flt => !flt.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(flt => flt.isDone)
                        }

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '25px 45px'}}
                                   elevation={5}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForTodolist}
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



