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
import Grid from "@mui/material/Grid/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper/Paper";
import {TodoList} from "./Todolist/TodoList";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo= false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
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

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
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
                                entityStatus={tl.entityStatus}
                                changeFilter={changeFilter}
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