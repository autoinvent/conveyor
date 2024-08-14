import type { StoryObj, Meta } from '@storybook/react';
import { SearchResults } from "./SearchResults"
import type { SearchResult } from '@/types';

const meta = {
  title: 'Commons/SearchResults',
  component: SearchResults,
  tags: ['autodocs'],
  args: {
    data: []
  }
} satisfies Meta<typeof SearchResults>;
export default meta;

type Story = StoryObj<typeof meta>;

const data : SearchResult[] = [
  {
    id: "1",
    type: "type-1",
    value: "value-1",
  },
  {
    id: "2",
    type: "type-1",
    value: "value-2",
  },
  {
    id: "3",
    type: "type-2",
    value: "value-1",
  },
  {
    id: "4",
    type: "type-2",
    value: "value-2",
  },
  {
    id: "5",
    type: "type-2",
    value: "value-3",
  },
  {
    id: "6",
    type: "type-3",
    value: "value-1",
  },
]

export const Results : Story = {
  args: {
    data: data,
  }
} 

export const Grouped : Story = {
  args: {
    data: data,
    groupBy: (item : SearchResult) => item.value.at(-1) ?? "undefined"
  }
}

export const NoResults : Story = {
  args: {
    data: []
  }
}