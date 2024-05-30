import type { Meta, StoryObj } from '@storybook/react';

import { ModelIndex } from '@/ModelIndex';
import { ScalarTypes } from '@/types';
import ModelIndexStoryMeta from '@/ModelIndex/ModelIndex.stories';

import { Conveyor } from './Conveyor';

const meta = {
  title: 'Model/Conveyor/Conveyor',
  component: Conveyor,
  tags: ['autodocs'],
  args: {
    valueOptions: {
      [ScalarTypes.STRING]: (value) => <b>{value}</b>,
    },
  },
} satisfies Meta<typeof Conveyor>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OverridingInput: Story = {
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
