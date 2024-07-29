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
    onPageChange: { control: false },
    per_page: { control: { type: 'number', min: 1 } },
    onPerPageChange: { control: false },
    maxPageButtonLimit: { control: { type: 'number', min: 1 } },
  },
  args: {
    onPageChange: () => {},
    onPerPageChange: () => {},
  },
  render: ({
    page: defaultPage,
    per_page: defaultPerPage,
    onPageChange,
    onPerPageChange,
    ...args
  }) => {
    const [page, setPage] = useState(defaultPage);
    const [per_page, setPerPage] = useState(defaultPerPage);

    return (
      <div className="flex flex-col">
        <Pagination
          page={page}
          onPageChange={setPage}
          per_page={per_page}
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
    page: 3,
    per_page: 5,
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
