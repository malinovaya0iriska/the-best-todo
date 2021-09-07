import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {
    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'Vanilla JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Git/Github', isDone: false},
    ]
    const tasks2 = [
        {id: 1, title: 'JS for children', isDone: true},
        {id: 2, title: 'React tutorial', isDone: false},
        {id: 3, title: 'GIT docs', isDone: false},
        {id: 3, title: 'Изучаем HTML и CSS', isDone: true},

    ]
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1}/>
            <TodoList title={'What to read'} tasks={tasks2}/>
        </div>
    );
}



