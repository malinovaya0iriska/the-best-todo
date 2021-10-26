import React from 'react';
import {Story, ComponentMeta} from '@storybook/react';

import {App} from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {action} from "@storybook/addon-actions";
import {EditableSpanExample} from "./EditableSpan.stories";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;


const Template: Story = (args) => <App {...args} />;

export const AppWithRedux = Template.bind({});

AppWithRedux.args = {

};

