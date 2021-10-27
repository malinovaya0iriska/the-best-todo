import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {EditableSpan} from './EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        value: {
            defaultValue: 'double click makes me to change',
            description: 'start value EditableSpan'
        },
        onChange: {
            description: 'EditableSpan value was changed'
        },
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('EditableSpan value was changed')
};

