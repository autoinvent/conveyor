import type { StoryObj, Meta } from '@storybook/react';
import { type HeaderComponentProps, type RowComponentProps, type ContentWrapperProps, SearchResults } from "./SearchResults"
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
const MyHeaderComponent = ({ category } : HeaderComponentProps) => (
  <div className='flex w-full flex-wrap'>
    <h1 className='w-full bg-gray-200 py-4 text-start italic'>
      {`This is a stylized header component for the category: ${category}`}
    </h1>
  </div>
)
const MyContentWrapper = ({ children } : ContentWrapperProps) => (
  <div className='flex w-full flex-row gap-2 bg-gray-400 p-2'>
    {children}
  </div>
)

export const Stylized : Story = {
  args: {
    HeaderComponent: MyHeaderComponent,
    RowComponent: MyRowComponent,
    ContentWrapper: MyContentWrapper
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