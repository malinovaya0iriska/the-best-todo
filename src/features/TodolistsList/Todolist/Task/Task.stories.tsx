import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";
import {RequestStatusType} from "../../../../app/app-reducer";

export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('task status was changed')
const changeTaskTitleCallback = action('task title was changed')
const removeTaskCallback = action('task was deleted')


const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskUncompleted = Template.bind({});
TaskUncompleted.args = {
    ...baseArgs,
    task: {
        id: '1232432',
        title: 'Created task',
        status: TaskStatuses.New,
        addedDate: Date(),
        deadline: null,
        description: null,
        order: 1,
        priority: TaskPriorities.Urgently,
        startDate: null,
        todoListId: 'todolistId_1',
        entityStatus: 'succeeded' as RequestStatusType,
    },
    todolistId: 'todolistId_1'
};

export const TaskCompleted = Template.bind({});
TaskCompleted.args = {
    ...baseArgs,
    task: {
        id: '1232432', title: 'Created task', status: TaskStatuses.Completed,
        addedDate: Date(),
        deadline: null,
        description: null,
        order: 1,
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId_1',
        entityStatus: 'succeeded' as RequestStatusType,
    },
    todolistId: 'todolistId_1'
};