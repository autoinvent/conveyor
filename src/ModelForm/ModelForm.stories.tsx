import {useState} from 'react'

import type { Meta, StoryObj } from '@storybook/react';

import ModelIndexStoryMeta from '@/ModelIndex/ModelIndex.stories';
import type { DataType } from '@/types';

import { ModelForm } from './ModelForm';

const meta = {
  title: 'Model/ModelForm/ModelForm',
  component: ModelForm,
  tags: ['autodocs'],
  args: {
    title: 'Disney Cat',
    fields: ModelIndexStoryMeta.args.fields,
    data: ModelIndexStoryMeta.args.data[0],
    onCreate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  },
  argTypes: {
    showActions: {
      control: 'boolean',
    },
    onCreate: { control: false },
    onUpdate: { control: false },
    onDelete: { control: false },
  },
  render: (props) => {
    return <ModelForm {...props} />;
  },
} satisfies Meta<typeof ModelForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CreateForm: Story = {};

export const UpdateForm: Story = {
  args: {
    onCreate: undefined,
  },
};

export const NoFields: Story = {
  args: {
    fields: [],
  },
};

export const NoData: Story = {
  args: {
    data: {},
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};

export const DisableActions = {
  args: {
    showActions: false,
  },
};

export const LoadedData = {
  render: ({ data, onUpdate, onCreate,...props }: any) => {
    const [currData, setCurrData] = useState<undefined | DataType>(undefined);
    return (
      <>
        <button type="button" onClick={() => setCurrData(data)}>
          Get Data
        </button>
        <button type="button" onClick={() => setCurrData(undefined)}>
          Load Data
        </button>
        <ModelForm
          data={currData}
          {...props}
          onUpdate={(params) => {
            if (params?.data) {
              setCurrData(params.data);
            }
          }}
        />
      </>
    );
  },
};

