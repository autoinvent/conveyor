import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';

const meta = {
  title: 'Commons/Table/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columnIds: ['firstname', 'lastname', 'username'],
    data: [
      { firstname: 'Robert', lastname: 'Hernandez', username: 'robxbob' },
      { firstname: 'Jeffrey', lastname: 'Davis', username: 'itechify' },
      { firstname: 'Aidan', lastname: 'Glenister', username: 'apglenister' },
      { firstname: 'Conner', lastname: 'MacGray', username: 'cmacgray14' },
      { firstname: 'Krista', lastname: 'Strucke', username: 'kurikurichan' },
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
