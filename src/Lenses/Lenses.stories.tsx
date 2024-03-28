import { useStore } from '@tanstack/react-store';
import type { Meta, StoryObj } from '@storybook/react';

import { Lens, Lenses, useLensesStore } from '@/Lenses';

const meta = {
  title: 'Commons/Lenses',
  component: Lenses,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    activeLens: 'blue',
    AvailableLenses: { BLUE: 'blue', RED: 'red' },
  },
} satisfies Meta<typeof Lenses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    return (
      <p>
        My favorite color is:
        <Lenses {...props}>
          <BlueLens />
          <RedLens />
        </Lenses>
      </p>
    );
  },
};

const BlueLens = () => {
  const lensesStore = useLensesStore();
  const AvailableLenses = useStore(
    lensesStore,
    (state) => state.AvailableLenses,
  );
  return (
    <Lens lens={AvailableLenses.BLUE}>
      <button
        style={{ backgroundColor: 'blue', color: 'white' }}
        onClick={() => {
          lensesStore.setState((state) => {
            return {
              ...state,
              activeLens: AvailableLenses.RED,
            };
          });
        }}
      >
        BLUE
      </button>
    </Lens>
  );
};

const RedLens = () => {
  const lensesStore = useLensesStore();
  const AvailableLenses = useStore(
    lensesStore,
    (state) => state.AvailableLenses,
  );
  return (
    <Lens lens={AvailableLenses.RED}>
      <button
        style={{ backgroundColor: 'red' }}
        onClick={() => {
          lensesStore.setState((state) => {
            return {
              ...state,
              activeLens: AvailableLenses.BLUE,
            };
          });
        }}
      >
        RED
      </button>
    </Lens>
  );
};
