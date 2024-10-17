import type { Meta, StoryObj } from '@storybook/react';
import { ModelListDisplay } from '../ModelListDisplay';

const meta = {
  title: 'Commons/Displays/ModelListDisplay',
  component: ModelListDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof ModelListDisplay>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    value: [
      { _display_value: 'forest' },
      { _display_value: 'waterfall' },
      { _display_value: 'boulder' },
    ],
  },
};

export const getDisplayValue: Story = {
  args: {
    getDisplayValue: (value) => (
      <span key={value._display_value} className="bg-red-200">
        {value._display_value}
      </span>
    ),
    value: [
      { _display_value: 'forest' },
      { _display_value: 'waterfall' },
      { _display_value: 'boulder' },
    ],
  },
};