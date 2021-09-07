import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'Vanilla JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Git/Github', isDone: false},
        {id: 5, title: 'NodeJS', isDone: false},
        {id: 6, title: 'REST API', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(flt => !flt.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(flt => flt.isDone)
    }

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}



