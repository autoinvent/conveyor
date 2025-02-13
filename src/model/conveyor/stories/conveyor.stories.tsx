import type { Meta, StoryObj } from '@storybook/react';

import {
  type ConveyorState,
  type Type,
  type Model,
  setupConveyorStore,
  useConveyorStore,
} from '../components/conveyor';

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
  title: 'Model Components/Conveyor',
  component: Demo,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Demo>;
export default meta;

type Story = StoryObj<typeof meta>;

setupConveyorStore(
  {
    types: {
      hello: {},
      world: {},
    },
    models: {
      Book: {
        title: {
          label: 'The Title',
          type: 'ID',
        },
      },
      Author: {
        name: {
          type: 'hello',
        },
      },
    },
  },
  true,
);

export const UseConveyorStore: Story = {
  render: () => {
    const state = useConveyorStore();
    return <Demo {...state} />;
  },
};
