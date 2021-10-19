import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

export function App() {

    const todolist_1_Id = v1()
    const todolist_2_Id = v1()
    const [todolists, setTodolists] = useState<Array<TodoType>>([
        {id: todolist_1_Id, title: 'What to learn', filter: 'all'},
        {id: todolist_2_Id, title: 'My hobbies', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolist_1_Id]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'Vanilla JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Git/Github', isDone: false},
            {id: v1(), title: 'NodeJS', isDone: false},
            {id: v1(), title: 'REST API', isDone: false},
        ],
        [todolist_2_Id]: [
            {id: v1(), title: 'Hiking', isDone: true},
            {id: v1(), title: 'Reading', isDone: true},
            {id: v1(), title: 'Coding', isDone: false},
            {id: v1(), title: 'Cooking', isDone: false},
            {id: v1(), title: 'Running', isDone: false},
            {id: v1(), title: 'Travelling', isDone: false},
        ],
    })

    const changeFilter = (filter: FilterType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }
    const addTodolist = (title: string) => {
        let newTodoId = v1()
        setTodolists([{id: newTodoId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodoId]: []})
    }
    const changeTodoTitle = (title: string, id: string) => {
        setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
    }
    const removeTask = (id: string, todolistId: string) => {
        let newTasks = tasks[todolistId].filter(t => t.id !== id)
        setTasks({...tasks, [todolistId]: newTasks})
    }
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let newTasks = tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks, [todolistId]: newTasks})
    }

    const addTask = (title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title.trim(), isDone: false}, ...tasks[todolistId]]})
    }

    const changeTaskTitle = (title: string, id: string, todolistId: string) => {
        let newTasks = tasks[todolistId].map(t => t.id === id ? {...t, title} : t)
        setTasks({...tasks, [todolistId]: newTasks})

    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(flt => !flt.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(flt => flt.isDone)
                }

                return <TodoList key={tl.id}
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
            })
            }
        </div>
    );
}



