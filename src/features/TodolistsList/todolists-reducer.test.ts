import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC, FilterType,
    removeTodoAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>=[];

beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodoAC(todolistId1)
    )
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodoAC({id: v1(), title: newTodolistTitle, addedDate: '', order: 0}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodoTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const endState = todolistsReducer(startState, changeTodoFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




