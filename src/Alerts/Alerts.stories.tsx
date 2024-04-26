import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertProps, Alerts, useAlerts } from '@/Alerts';

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
    expires: 10000,
  },
  argTypes: {
    alertId: { table: { disable: true } },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    return (
      <div className='w-48 h-60'>
        <Alerts className='absolute top-12'>
          <AddAlertButton {...props} />
        </Alerts>
      </div>
    );
  },
};

export const CustomizingAlert: Story = {
  render: (props) => {
    return (
      <div className='w-48 h-60'>
        <Alerts
          className='absolute top-12 left-16'
          AlertComponent={CustomAlert}
        >
          <AddAlertButton {...props} />
        </Alerts>
      </div>
    );
  },
};

const AddAlertButton = (props: AlertProps) => {
  const { addAlert } = useAlerts();
  const [counter, setCounter] = useState(0);
  return (
    <button
      onClick={() => {
        addAlert({ ...props, content: `${props.content} ${counter}` });
        setCounter(counter + 1);
      }}
    >
      Add Alert
    </button>
  );
};

const CustomAlert = (props: AlertProps) => {
  return (
    <div className='bg-cyan-300 w-full h-full'>
      <p>This is customized</p>
      <Alert {...props} />
    </div>
  );
};
