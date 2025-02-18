import type { Meta, StoryObj } from '@storybook/react';

import type { ConveyorState, Model, Type } from '../types';
import { useConveyorStore } from '../useConveyorStore';

const Demo = <
  TTypes extends Record<string, Type>,
  TModels extends Record<string, Model<Extract<keyof TTypes, string>>>,
>(
  props: Partial<ConveyorState<TTypes, TModels>>,
) => {
  console.log(props);
  return (
    <div>
      <pre>{JSON.stringify(props, null, '\t')}</pre>
    </div>
  );
};

const meta = {
  title: 'Model UI/Conveyor',
  component: Demo,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Demo>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UseConveyorStore: Story = {
  render: () => {
    const state = useConveyorStore();
    return <Demo {...state} />;
  },
};
