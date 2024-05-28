import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '@/Table';

const meta = {
  title: 'Commons/Table/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columnIds: ['firstname', 'lastname', 'username'],
    data: [
      { firstname: 'Robert', lastname: 'Hernandez' },
      { firstname: 'Jeffrey', lastname: 'Davis' },
      { firstname: 'Aidan', lastname: 'Glenister' },
    ],
  },
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const NoColumns: Story = {
  args: {
    columnIds: [],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};
