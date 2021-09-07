import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'Vanilla JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Git/Github', isDone: false},
        {id: v1(), title: 'NodeJS', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(flt => !flt.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(flt => flt.isDone)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        setTasks([
            {id: v1(), title, isDone: false},
            ...tasks
        ])
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}



