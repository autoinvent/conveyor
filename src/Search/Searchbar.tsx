import { ComponentProps, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export interface SearchBarProps extends ComponentProps<'form'> {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch, ...props }: SearchBarProps) => {
  const [value, setValue] = useState('');
  return (
    <form
      className='flex border border-[--border-color] rounded-2xl items-center text-center my-2'
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSearch(value);
      }}
    >
      <input
        className="flex-1 bg-transparent text-[--text-color] border border-transparent outline-none py-1.5 px-3 border-r-[--border-color] rounded-l-2xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
      />
      <button className="bg-transparent py-1.5 px-3 border border-transparent text-center rounded-r-2xl cursor-pointer" type="submit">
        <FaSearch />
      </button>
    </form>
  );
};
