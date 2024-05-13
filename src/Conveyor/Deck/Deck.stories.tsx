import type { Meta, StoryObj } from '@storybook/react';

import {
  Deck,
  CircleCard,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
  CardField,
} from '@/Conveyor/Deck';

const meta = {
  title: 'Commons/Deck',
  component: Deck,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    children: {},
  },
} satisfies Meta<typeof Deck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: (props) => {
    return (
      <div className="max-w-[80%] mx-[10%]">
        <Deck>
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
          <ExampleCard />
        </Deck>
      </div>
    );
  },
};

export const ExampleCard = () => {
  return (
    <CircleCard>
      <CardHeader>
        <CardTitle>Conveyor</CardTitle>
        <CardDescription>5 models</CardDescription>
      </CardHeader>
      <CardContent>
        <CardField>
          this is an example field for the purpose of testing this on storybook
        </CardField>
        <CardField>
          this is an example field for the purpose of testing this on storybook
        </CardField>
      </CardContent>
    </CircleCard>
  );
};
