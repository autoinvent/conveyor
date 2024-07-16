import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { useState } from 'react';

const meta = {
  title: 'Commons/Table/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    columnIds: ['firstname', 'lastname', 'username'],
    data: [
      { firstname: 'Robert', lastname: 'Hernandez', username: 'robert.hernandez' },
      { firstname: 'Jeffrey', lastname: 'Davis', username: 'jeffrey.davis' },
      { firstname: 'Aidan', lastname: 'Glenister', username: 'aidan.glenister' },
      { firstname: 'Conner', lastname: 'MacGray', username: 'conner.macgray' },
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
