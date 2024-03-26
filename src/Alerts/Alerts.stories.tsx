import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertProps, Alerts, useAddAlert } from '@/Alerts';

const meta = {
    title: 'Commons/Alerts',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        alertId: '',
        content: 'This is an Alert!',
        expires: 3000
    },
    argTypes: {
        alertId: { table: { disable: true } }
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
    render: (props) => {
        return (
            <div style={{ width: '200px', height: '250px' }}>
                <Alerts style={{ position: 'absolute', top: '50px' }}>
                    <AddAlertButton {...props} />
                </Alerts>
            </div>
        )
    },
};

export const CustomizingAlert: Story = {
    render: (props) => {
        return (
            <div style={{ width: '200px', height: '250px' }}>
                <Alerts style={{ position: 'absolute', top: '50px' }} AlertComponent={CustomAlert}>
                    <AddAlertButton {...props} />
                </Alerts>
            </div>
        )
    },
};

const AddAlertButton = (props: AlertProps) => {
    const addAlert = useAddAlert()
    const [counter, setCounter] = useState(0)
    return <button onClick={() => { addAlert({ ...props, content: `${props.content} ${counter}` }); setCounter(counter + 1) }}>Add Alert</button>

}

const CustomAlert = (props: AlertProps) => {
    return <div style={{ backgroundColor: 'cyan' }}>
        <p>This is customized</p>
        <Alert {...props} />
    </div>
}

