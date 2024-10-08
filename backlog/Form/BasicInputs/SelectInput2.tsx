import type { ComponentProps } from 'react';

import Select from 'react-select';

import { cn } from '@/lib/utils';

interface SelectStyleProps {
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
}

export type SelectInputProps = ComponentProps<typeof Select>;

export const SelectInput = ({ options, ...props }: SelectInputProps) => {
  const defaultStyling = {
    clearIndicator: ({ isFocused }: SelectStyleProps) =>
      cn(
        isFocused ? 'text-neutral-600' : 'text-neutral-200',
        'p-2',
        isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400',
      ),
    //use 'container' key for selectContainer component!!
    //container: () => cn(),
    control: ({ isDisabled, isFocused }: SelectStyleProps) =>
      cn(
        isDisabled ? 'bg-neutral-50' : 'bg-white',
        'dark:bg-black',
        'border-solid',
        'border',
        'rounded-md',
        '!flex-nowrap',
        'items-center',
      ),
    dropdownIndicator: ({ isFocused }: SelectStyleProps) =>
      cn(
        isFocused ? 'text-neutral-600' : 'text-neutral-200',
        'p-2',
        isFocused ? 'hover:text-neutral-800' : 'hover:text-neutral-400',
      ),
    group: () => cn('py-2'),
    groupHeading: () =>
      cn(
        'text-neutral-400',
        'text-xs',
        'font-medium',
        'mb-1',
        'px-3',
        'uppercase',
      ),
    indicatorsContainer: () => cn('inline-block'),
    indicatorSeparator: ({ isDisabled }: SelectStyleProps) =>
      cn(isDisabled ? 'bg-neutral-100' : 'bg-neutral-200', 'my-2'),
    input: () => cn('m-0.5', 'py-0.5', 'text-neutral-800'),
    loadingIndicator: ({ isFocused }: SelectStyleProps) =>
      cn(isFocused ? 'text-neutral-600' : 'text-neutral-200', 'p-2'),
    loadingMessage: () => cn('text-neutral-400', 'py-2', 'px-3'),
    menu: () =>
      cn(
        'bg-white',
        'dark:bg-black',
        'rounded-md',
        'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',
        'my-1',
        'mt-2',
        'px-1',
        'border',
        'border-neutral-50',
        'dark:border-slate-700',
      ),
    menuList: () => cn('py-1'),
    // menuPortal: () => cn(),
    multiValue: () =>
      cn('bg-slate-200', 'dark:bg-slate-800', 'rounded-md', 'm-0.5'),
    multiValueLabel: () =>
      cn(
        'rounded-md',
        'text-neutral-800',
        'text-sm',
        'px-1',
        'dark:text-white',
      ),
    multiValueRemove: ({ isFocused }: SelectStyleProps) =>
      cn(
        'rounded-md',
        isFocused && 'bg-red-500',
        'px-1',
        'hover:bg-red-500',
        'hover:text-red-800',
        'dark:bg-slate-800',
      ),
    noOptionsMessage: () => cn('text-neutral-400', 'py-2', 'px-3'),
    option: ({ isDisabled, isFocused, isSelected }: SelectStyleProps) =>
      cn(
        isFocused ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent',
        isSelected ? 'font-bold' : 'text-inherit',
        'py-2',
        'px-3',
        'rounded-md',
      ),
    placeholder: () => cn('text-neutral-500', 'mx-0.5'),
    singleValue: ({ isDisabled }: SelectStyleProps) =>
      cn(
        //isDisabled ? 'text-neutral-400' : 'text-neutral-800',
        'text-inherit',
        'mx-0.5',
      ),
    valueContainer: () =>
      cn('py-0.5', 'px-2', '!overflow-visible', 'inline-block'),
  };

  return (
    <div className="rounded-md focus-within:outline focus-within:outline-2 focus-within:outline-offset-2">
      <Select
        {...props}
        unstyled
        classNames={defaultStyling}
        menuPortalTarget={document.body}
        options={options}
      />
    </div>
  );
};
