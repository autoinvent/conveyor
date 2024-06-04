import type { Meta, StoryObj } from '@storybook/react';

import { DataStoreProvider } from './DataStoreContext';
import { useDataStore } from './useDataStore';

const meta = {
  title: 'Commons/Data',
  component: DataStoreProvider,
  tags: ['autodocs'],
  args: {
    data: { id: 1, name: 'Robert Hernandez', dogs: 3 },
  },
} satisfies Meta<typeof DataStoreProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (args) => {
    return (
      <div>
        <DataStoreProvider data={args.data}>
          <DataList />
        </DataStoreProvider>
      </div>
    );
  },
};

const DataList = () => {
  const data = useDataStore();
  return (
    <ul>
      {Object.keys(data).map((dataKey) => {
        return (
          <li key={dataKey}>
            {dataKey}: {JSON.stringify(data[dataKey])}
          </li>
        );
      })}
    </ul>
  );
};
