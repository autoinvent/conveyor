import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { RawValue } from '@/Form';
import { ModelIndex } from '@/ModelIndex';
import ModelIndexStoryMeta from '@/ModelIndex/ModelIndex.stories';
import { FieldTypes, type TableView } from '@/types';

import { Conveyor } from './Conveyor';

// const BEARS = [
//   { id: '1', name: 'Winnie The Pooh' },
//   { id: '2', name: 'Baloo' },
// ];

const meta = {
  title: 'Model/Conveyor/Conveyor',
  component: Conveyor,
  tags: ['autodocs'],
  args: {
    typeOptions: {
      [FieldTypes.STRING]: {
        valueRenderFn: (props) => (
          <RawValue className="text-green-700" {...props} />
        ),
      },
    },
  },
} satisfies Meta<typeof Conveyor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OverridingValue: Story = {
  render: (args) => {
    const [tableView, onTableViewChange] = useState<TableView>({});
    return (
      <div className="flex flex-col">
        <Conveyor {...args}>
          <ModelIndex
            {...ModelIndexStoryMeta.args}
            tableViewOptions={{
              tableView,
              onTableViewChange,
            }}
          />
        </Conveyor>
      </div>
    );
  },
};
