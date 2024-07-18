import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';

import { Lens } from './Lens';
import { Lenses } from './LensesStoreContext';

const meta = {
  title: 'Commons/Lenses',
  component: Lenses,
  tags: ['autodocs'],
} satisfies Meta<typeof Lenses>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    initialLens: 'green',
  },
  render: (args) => {
    const [activeLens, setActiveLens] = useState(args.activeLens);

    useEffect(() => {
      setActiveLens(args.activeLens);
    }, [args.activeLens]);

    return (
      <div className="flex flex-col">
        <Lenses initialLens={args.initialLens} activeLens={activeLens}>
          <Lens lens="red">
            <div className="bg-red-600 text-center">Red Lens</div>
          </Lens>
          <Lens lens="blue">
            <div className="bg-blue-600 text-center">Blue Lens</div>
          </Lens>
          <Lens lens="green">
            <div className="bg-green-600 text-center">
              (Inital Lens) Green Lens
            </div>
          </Lens>
        </Lenses>
        <Button
          variant="outline"
          className="m-auto mt-4 border border-border px-2 py-1"
          onClick={() => {
            setActiveLens(activeLens === 'red' ? 'blue' : 'red');
          }}
        >
          Change colors
        </Button>
      </div>
    );
  },
};
