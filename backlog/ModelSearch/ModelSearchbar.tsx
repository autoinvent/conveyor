import { Search } from 'lucide-react';
import { type ComponentProps, useState } from 'react';

import { Button } from '@/lib/components/ui/button';

export interface ModelSearchbarProps extends ComponentProps<'form'> {
  onSearch: (value: string) => void;
}

export const ModelSearchbar = ({ onSearch }: ModelSearchbarProps) => {
  const [value, setValue] = useState('');
  return (
    <form
      className="my-2 flex items-center rounded-2xl border border-border text-center"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSearch(value);
      }}
    >
      <input
        className="flex-1 rounded-l-2xl border border-transparent border-r-border bg-transparent px-3 py-1.5 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
      />
      <Button
        className="cursor-pointer rounded-r-2xl border border-transparent bg-transparent px-3 py-1.5 text-center"
        type="submit"
      >
        <Search />
      </Button>
    </form>
  );
};
