import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';

import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;


const Template: Story = (args) => <App {...args} />;

export const AppWithRedux = Template.bind({});

AppWithRedux.args = {

};

