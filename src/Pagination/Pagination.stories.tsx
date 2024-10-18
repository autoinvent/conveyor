import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta = {
  title: 'Commons/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalDataLength: { control: { type: 'number', min: 0 } },
    page: { control: { type: 'number', min: 1 } },
    perPage: { control: { type: 'number', min: 1 } },
    maxPageButtonLimit: { control: { type: 'number', min: 1 } },
    onPageChange: { control: false },
    onPerPageChange: { control: false },
  },
  args: {
    onPageChange: () => {},
    onPerPageChange: () => {},
  },
  render: ({
    page: defaultPage,
    perPage: defaultPerPage,
    onPageChange,
    onPerPageChange,
    ...args
  }) => {
    const [page, setPage] = useState(defaultPage);
    const [perPage, setPerPage] = useState(defaultPerPage);

    return (
      <div className="flex flex-col">
        <Pagination
          page={page}
          onPageChange={setPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
          {...args}
        />
      </div>
    );
  },
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    totalDataLength: 200,
    page: 1,
    perPage: 5,
    maxPageButtonLimit: 5,
  },
};

/**
 * Nothing is rendered when `totalDataLength` is not set.
 */
export const NoData: Story = {
  args: {},
};

/**
 * Pagination with `totalDataLength` set.
 */
export const UsingDefaultProps: Story = {
  args: {
    totalDataLength: 200,
  },
};
