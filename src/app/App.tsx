import React from 'react';
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

export type TasksType = {
    [key: string]: TaskType []
}

export function App() {
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
                <TodolistsList/>
            </Container>
        </div>
    );
}

