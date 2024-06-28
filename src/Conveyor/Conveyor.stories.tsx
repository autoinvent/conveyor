import type { Meta, StoryObj } from '@storybook/react';

import { ModelIndex, useTableView } from '@/ModelIndex';
import ModelIndexStoryMeta from '@/ModelIndex/ModelIndex.stories';
import { FieldTypes } from '@/types';

import { Conveyor } from './Conveyor';

const BEARS = [
  { id: '1', name: 'Winnie The Pooh' },
  { id: '2', name: 'Baloo' },
];

const meta = {
  title: 'Model/Conveyor/Conveyor',
  component: Conveyor,
  tags: ['autodocs'],
  args: {
    typeOptions: {
      [FieldTypes.STRING]: {
        valueRenderFn: ({ value }) => <b className="text-green-700">{value}</b>,
      },
      DisneyBear: {
        valueRenderFn: ({ value }) => (
          <b>{BEARS.find((bear) => bear.id === value?.id)?.name ?? 'none'}</b>
        ),
      },
    },
  },
} satisfies Meta<typeof Conveyor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OverridingValue: Story = {
  render: (args) => {
    const tableViewOptions = useTableView();
    return (
      <div className="flex flex-col">
        <Conveyor {...args}>
          <ModelIndex {...ModelIndexStoryMeta.args} {...tableViewOptions} />
        </Conveyor>
      </div>
    );
  },
};
