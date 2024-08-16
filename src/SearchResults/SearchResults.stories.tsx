import type { StoryObj, Meta } from '@storybook/react';
import { type RowComponentProps, SearchResults } from "./SearchResults"
import { Button } from '@/lib/components/ui/button';

const meta = {
  title: 'Commons/SearchResults',
  component: SearchResults,
  tags: ['autodocs'],
  args: {
    data: [
      {
        id: "1",
        type: "type-1",
        value: "value-1-1",
      },
      {
        id: "2",
        type: "type-1",
        value: "value-1-2",
      },
      {
        id: "3",
        type: "type-2",
        value: "value-2-1",
      },
      {
        id: "4",
        type: "type-2",
        value: "value-2-2",
      },
      {
        id: "5",
        type: "type-2",
        value: "value-2-3",
      },
      {
        id: "6",
        type: "type-3",
        value: "value-3-1",
      }
    ]
  }
} satisfies Meta<typeof SearchResults>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NoExtras : Story = {}

const MyRowComponent = ({ item } : RowComponentProps) => (
  <Button className='max-w-40' key={item.value}>
      {item.value}
  </Button>
)

export const Display : Story = {
  args: {
    RowComponent: MyRowComponent
  }
}

export const Grouped : Story = {
  args: {
    groupBy: (item) => item.value.at(-1) ?? "undefined"
  }
}

export const NoResults : Story = {
  args: {
    data: []
  }
}