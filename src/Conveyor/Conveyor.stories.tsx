import type { Meta, StoryObj } from '@storybook/react';

import { ModelIndex } from '@/ModelIndex';
import ModelIndexStoryMeta from '@/ModelIndex/ModelIndex.stories';
import { ScalarTypes } from '@/types';

import { Conveyor } from './Conveyor';

const meta = {
  title: 'Model/Conveyor/Conveyor',
  component: Conveyor,
  tags: ['autodocs'],
  args: {
    valueOptions: {
      [ScalarTypes.STRING]: ({ value }) => (
        <b className="text-green-700">{value}</b>
      ),
    },
  },
} satisfies Meta<typeof Conveyor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OverridingValue: Story = {
  render: (args) => {
    return (
      <div className="flex flex-col">
        <Conveyor {...args}>
          <ModelIndex {...ModelIndexStoryMeta.args} />
        </Conveyor>
      </div>
    );
  },
};
