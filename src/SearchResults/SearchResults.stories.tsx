import type { StoryObj, Meta } from '@storybook/react';
import { SearchResults } from "./SearchResults"

const meta = {
  title: 'Commons/SearchResults',
  component: SearchResults,
  tags: ['autodocs'],
  args: {
    data: [
      {
        id: "6",
        type: "type-3",
        value: "value-3-1",
      },
      {
        id: "4",
        type: "type-2",
        value: "value-2-2",
      },
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
        id: "5",
        type: "type-2",
        value: "value-2-3",
      },
    ],
    type: 'single'
  }
} satisfies Meta<typeof SearchResults>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NoExtras : Story = {}

export const Stylized : Story = {
  args: {
    getLabel: ({ category }) => <h1 className='w-full bg-slate-400 font-4xl font-bold italic'>{category}</h1>,
    getContent: ({ results }) => (
      <div className="flex flex-row gap-2">
        { results.map( result => 
          <p key={result.id} className='rounded-md bg-slate-400 p-2'>{result.value}</p>
        )}
      </div>
    ),
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
