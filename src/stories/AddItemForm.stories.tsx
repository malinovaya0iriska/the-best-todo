import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from '../AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'button inside the form was clicked'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('button inside the form was clicked')
};

