import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Slots, Slot, useIsFirstRender } from '@/index';

const meta = {
  title: 'Commons/Slots',
  component: Slots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    slotOrder: ['slot1', 'slot2', 'slot3'],
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Slots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    const isFirstRender = useIsFirstRender();
    const [slotOrder, setSlotOrder] = useState(props.slotOrder);
    const onClick = () => {
      setSlotOrder((state) => [...state, 'secret-slot']);
    };

    useEffect(() => {
      if (!isFirstRender.current) {
        setSlotOrder(props.slotOrder);
      }
    }, [props.slotOrder]);
    return (
      <ListGroup>
        <Slots slotOrder={slotOrder}>
          <Slot slot='slot1'>
            <ListGroup.Item>It's </ListGroup.Item>
          </Slot>
          <Slot slot='slot2'>
            <ListGroup.Item>a </ListGroup.Item>
          </Slot>
          <Slot slot='slot3'>
            <ListGroup.Item>
              <button onClick={onClick}>Beaver!</button>
            </ListGroup.Item>
          </Slot>
          <Slot slot='secret-slot'>
            <ListGroup.Item>Or is it?!</ListGroup.Item>
          </Slot>
        </Slots>
      </ListGroup>
    );
  },
};

export const DuplicateSlots: Story = {
  render: (props) => (
    <ListGroup>
      <Slots {...props}>
        <Slot slot='slot3'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slot='slot3'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slot='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
      </Slots>
    </ListGroup>
  ),
};

export const DuplicateSlotsInSlotOrder: Story = {
  args: {
    slotOrder: ['slot1', 'slot1', 'slot1'],
  },
  render: (props) => (
    <ListGroup>
      <Slots {...props}>
        <Slot slot='slot1'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slot='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slot='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
        <Slot slot='secret-slot'>
          <ListGroup.Item>Or is it?!</ListGroup.Item>
        </Slot>
      </Slots>
    </ListGroup>
  ),
};

export const SlotsWithNonSlotChildren: Story = {
  render: (props) => (
    <ListGroup>
      <Slots {...props}>
        <ListGroup.Item>Not a Slot (Top)</ListGroup.Item>
        <Slot slot='slot1'>
          <ListGroup.Item>It's </ListGroup.Item>
        </Slot>
        <Slot slot='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slot='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
        <ListGroup.Item>Not a Slot (Bottom)</ListGroup.Item>
      </Slots>
    </ListGroup>
  ),
};

export const SlotsInDepth: Story = {
  render: (props) => (
    <ListGroup>
      <Slots {...props}>
        <ListGroup.Item>
          Yes,
          <b>
            <Slot slot='slot1'>
              <ListGroup.Item>It's</ListGroup.Item>
            </Slot>
          </b>
        </ListGroup.Item>
        <Slot slot='slot2'>
          <ListGroup.Item>a </ListGroup.Item>
        </Slot>
        <Slot slot='slot3'>
          <ListGroup.Item>Beaver!</ListGroup.Item>
        </Slot>
      </Slots>
    </ListGroup>
  ),
};
