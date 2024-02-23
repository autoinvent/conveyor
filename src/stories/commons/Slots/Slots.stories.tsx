import type { Meta, StoryObj } from '@storybook/react';

import Slot from '../../../components/Slot'
import { SlotsProvider } from '../../../contexts/SlotsContext';

const meta = {
    title: 'Commons/Slots',
    component: SlotsProvider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        slotKeys: ['slot1', 'slot2', 'slot3']
    },
    argTypes: {
        children: {
            options: ['Xinit'],
            mapping: {
                Xinit: <><Slot slotKey="slot1">Hello</Slot><Slot slotKey="slot2">World</Slot></>
            }
        }
    }
} satisfies Meta<typeof SlotsProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        slotKeys: ['slot1', 'slot2', 'slot3'],
    }
};

