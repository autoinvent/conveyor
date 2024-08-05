import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';

import ModelTableStoryMeta from '@/ModelTable/stories/ModelTable.stories';
import type { DataType } from '@/types';

import { ModelForm } from './ModelForm';

const meta = {
  title: 'Model/ModelForm/ModelForm',
  component: ModelForm,
  tags: ['autodocs'],
  args: {
    fields: ModelTableStoryMeta.args.fields,
    data: ModelTableStoryMeta.args.data[0],
    onCreate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  },
  argTypes: {
    readOnly: {
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

export const ReadOnly = {
  args: {
    readOnly: true,
  },
};

export const LoadedData = {
  render: ({ data, onUpdate, onCreate, ...props }: any) => {
    const [currData, setCurrData] = useState<undefined | DataType>(undefined);
    return (
      <>
        <Button variant="outline" onClick={() => setCurrData(data)}>
          Get Data
        </Button>
        <Button variant="outline" onClick={() => setCurrData(undefined)}>
          Load Data
        </Button>
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
