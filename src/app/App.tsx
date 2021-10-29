import React, {useCallback, useEffect} from 'react';
import './App.css';
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import AppBar from "@mui/material/AppBar/AppBar";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import {TaskType} from "../api/tasks-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {logOutTC} from "../features/Login/auth-reducer";


export type TasksDomainType = TaskType & { entityStatus: RequestStatusType }
export type TasksType = {
    [key: string]: Array<TasksDomainType>
}

export function App({demo = false}) {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>((state: AppRootStateType) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.app.isInitialized)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    {isLoggedIn &&
                    <Button variant={'outlined'} color={'inherit'} onClick={logOutHandler}>Log OUT</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

