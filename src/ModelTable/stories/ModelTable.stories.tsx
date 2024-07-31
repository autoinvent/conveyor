import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { TableView } from '@/types';

import { ModelTable } from '../ModelTable';

const meta = {
  title: 'Models/ModelTable',
  component: ModelTable,
  tags: ['autodocs'],
  args: {
    fields: ['title', 'author', 'published', 'rating', 'genre'],
    data: [
      {
        title: 'The House of the Scorpion',
        author: 'Nancy Farmer',
        published: '2002-01-01T01:56:34.926365',
        rating: 4.1,
        genre: 'fiction',
      },
    ],
    tableOptions: {
      columnOptions: {
        title: {
          hidable: false,
        },
        author: {
          sortable: false,
        },
      },
    },
    onUpdate: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    onDelete: () => new Promise((resolve) => setTimeout(resolve, 3000)),
  },
  render: ({ tableOptions, ...args }) => {
    const [sortOrder, onSortOrderChange] =
      useState<TableView['sort']>(undefined);
    return (
      <ModelTable
        {...args}
        tableOptions={{ ...tableOptions, sortOrder, onSortOrderChange }}
      />
    );
  },
} satisfies Meta<typeof ModelTable>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
