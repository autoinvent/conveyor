import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/lib/components/ui/button';

import { Header } from './Header';

const meta = {
  title: 'Commons/Header',
  component: Header,
  tags: ['autodocs'],
  render: ({ ...args }) => {
    return (
      <div className="flex flex-col">
        <Header {...args}>
          <Header.Title>List of Books</Header.Title>
          <Header.Actions>
            <Button>Create</Button>
            <Button>Settings</Button>
          </Header.Actions>
        </Header>
        <p className="h-40 place-content-center border text-center">
          Some content
        </p>
      </div>
    );
  },
} satisfies Meta<typeof Header>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};
