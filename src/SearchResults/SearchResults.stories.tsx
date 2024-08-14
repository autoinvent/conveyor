import type { StoryObj } from '@storybook/react';
import { SearchResults } from "./SearchResults"

const meta = {
  title: 'Commons/SearchResults',
  component: SearchResults,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const SearchStory : Story = {
  args:  {
    
  }
}    