import { ListGroup } from 'react-bootstrap';
import type { Meta, StoryObj } from '@storybook/react';

import { Slots, Slot } from '@/index';

const meta = {
  title: 'Commons/Slots',
  component: Slots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    slotKeys: ['slot1', 'slot2', 'slot3'],
    children: (
      <>
        <Slot slotKey='slot1'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
        <Slot slotKey='secret-slot'>
          <ListGroup.Item>Or is it?!</ListGroup.Item>
        </Slot>
      </>
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (props) => (
    <ListGroup>
      <Slots {...props} />
    </ListGroup>
  ),
} satisfies Meta<typeof Slots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {};

export const DuplicateSlots: Story = {
  args: {
    children: (
      <>
        <Slot slotKey='slot3'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot3'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
      </>
    ),
  },
};

export const DuplicateSlotKeys: Story = {
  args: {
    slotKeys: ['slot1', 'slot1', 'slot1'],
  },
};

export const SlotsWithNonSlotChildren: Story = {
  args: {
    children: (
      <>
        <ListGroup.Item>Not a Slot (Top)</ListGroup.Item>
        <Slot slotKey='slot1'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
        <ListGroup.Item>Not a Slot (Bottom)</ListGroup.Item>
      </>
    ),
  },
};

export const SlotsInDepth: Story = {
  args: {
    children: (
      <>
        <ListGroup.Item>
          Yes,
          <b>
            <Slot slotKey='slot1'>
              <ListGroup.Item>It's</ListGroup.Item>
            </Slot>
          </b>
        </ListGroup.Item>
        <Slot slotKey='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slotKey='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
      </>
    ),
  },
};
