import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

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
    task: {id: '1232432', title: 'Created task', isDone: false},
    todolistId: 'todolistId_1'
};

export const TaskCompleted = Template.bind({});
TaskCompleted.args = {
    ...baseArgs,
    task: {id: '1232432', title: 'Created task', isDone: true},
    todolistId: 'todolistId_1'
};