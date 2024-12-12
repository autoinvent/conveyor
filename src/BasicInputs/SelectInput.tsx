import { type ComponentProps, type ElementRef, forwardRef } from 'react';

import Select, {
  type GroupBase,
  type Props as SelectProps,
} from 'react-select';
import type {} from 'react-select/base';
import Creatable, { type CreatableProps } from 'react-select/creatable';

import type { FormControlChildProps } from '@/Form';
import { cn } from '@/lib/utils';

declare module 'react-select/base' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    clearValue?: () => void;
  }

  export interface CreatableProps<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    clearValue?: () => void;
  }
}

export interface SelectInputBaseProps<TIsCreatable extends boolean>
  extends Pick<FormControlChildProps, 'disabled'> {
  isCreatable?: TIsCreatable;
}

export type SelectInputProps<TIsCreatable extends boolean> =
  SelectInputBaseProps<TIsCreatable> &
    (TIsCreatable extends true
      ? CreatableProps<any, boolean, GroupBase<any>>
      : SelectProps<any, boolean>);

export const SelectInput = forwardRef<
  ElementRef<typeof Select>,
  SelectInputProps<boolean>
>(({ id, disabled, className, isCreatable, isMulti, ...props }, ref) => {
  const defaultStyling: ComponentProps<typeof Select>['classNames'] = {
    clearIndicator: ({ isFocused }) =>
      cn(
        isFocused ? 'text-muted-foreground' : 'text-foreground',
        'p-2',
        isFocused ? 'hover:text-foreground' : 'hover:text-muted-foreground',
      ),
    //use 'container' key for selectContainer component!!
    //container: () => cn(),
    control: ({ isDisabled }) =>
      cn(
        'bg-background',
        isDisabled && 'opacity-50',
        'border-solid',
        'border',
        'rounded-md',
        'flex-nowrap',
        'items-center',
      ),
    dropdownIndicator: ({ isFocused }) =>
      cn(
        'p-2',
        isFocused
          ? 'text-muted-foreground hover:text-foreground'
          : 'text-foreground hover:text-muted-foreground',
      ),
    group: () => cn('py-2'),
    groupHeading: () =>
      cn(
        'text-muted-foreground',
        'text-xs',
        'font-medium',
        'mb-1',
        'px-3',
        'uppercase',
      ),
    indicatorsContainer: () => cn('inline-block'),
    indicatorSeparator: () => cn('bg-foreground', 'my-2'),
    input: () => cn('m-0.5', 'py-0.5', 'text-muted-foreground'),
    // loadingIndicator: ({ isFocused }) =>
    //   cn(isFocused ? 'text-neutral-600' : 'text-neutral-200', 'p-2'),
    // loadingMessage: () => cn('text-neutral-400', 'py-2', 'px-3'),
    menu: () =>
      cn(
        'bg-background',
        'rounded-md',
        'my-1',
        'mt-2',
        'p-1',
        'pr-0.5',
        'border',
        'border-border',
        'min-w-fit',
      ),
    menuList: () =>
      cn(
        'p-0',
        'pr-1',
        '[&::-webkit-scrollbar]:w-2',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-border',
        '[&::-webkit-scrollbar-thumb]:rounded-3xl',
      ),
    // menuPortal: () => cn(),
    multiValue: () => cn('bg-secondary', 'rounded-md', 'm-1', 'p-0'),
    multiValueLabel: () =>
      cn('rounded-md', 'text-foreground', 'text-sm', 'px-1'),
    multiValueRemove: () => cn('rounded-md', 'px-1', 'bg-inherit'),
    noOptionsMessage: () => cn('text-muted-foreground', 'py-2', 'px-3'),
    option: ({ isFocused, isSelected }) =>
      cn(
        isFocused ? 'bg-secondary' : 'bg-transparent',
        isSelected ? 'font-bold' : 'text-sm',
        'py-2',
        'px-3',
        'rounded-md',
      ),
    placeholder: () => cn('text-muted-foreground', 'mx-0.5', 'text-sm'),
    singleValue: () =>
      cn(
        //isDisabled ? 'text-neutral-400' : 'text-neutral-800',
        'text-sm',
        'mx-0.5',
      ),
    valueContainer: () =>
      cn('py-0.5', 'px-3', 'overflow-visible', 'inline-block'),
  };

  const isArray = Array.isArray(props.value) || isMulti;
  const commonProps: ComponentProps<typeof Select> = {
    ref,
    unstyled: true,
    classNames: defaultStyling,
    isDisabled: disabled,
    inputId: id,
    menuPlacement: 'auto',
    menuPortalTarget: document.body,
    isMulti: isArray,
    closeMenuOnSelect: !isArray,
    isClearable: true,
    menuShouldBlockScroll: true,
  };

  return (
    <div
      className={cn(
        'rounded-md ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      {isCreatable ? (
        <Creatable {...commonProps} {...props} />
      ) : (
        <Select {...commonProps} {...props} />
      )}
    </div>
  );
});
