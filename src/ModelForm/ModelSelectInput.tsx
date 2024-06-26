import { useState } from 'react';
import { LuCheck, LuChevronDown, LuChevronUp } from 'react-icons/lu';
import * as SelectPrimitive from '@radix-ui/react-select';

import type { SelectOption } from './types';

export interface ModelSelectInputProps {
  fieldName: string;
  value: string;
  onValueChange: (value: string) => string;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export const ModelSelectInput = ({
  fieldName,
  value,
  onValueChange,
  onOpenFieldSelect,
  required,
  placeholder,
  className,
}: ModelSelectInputProps) => {
  const notRequiredOption = [{ label: 'none', value: 'null' }];
  const [options, setOptions] = useState<SelectOption[]>(
    value !== 'null' ? [{ label: value, value }] : notRequiredOption,
  );
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (open) {
          onOpenFieldSelect?.(fieldName).then((res) =>
            setOptions(res.concat(required ? [] : notRequiredOption)),
          );
        }
      }}
    >
      <SelectPrimitive.Trigger className="w-full flex h-full min-w-32 items-center justify-between rounded-sm focus:rounded-sm border-0 bg-[--bg-accent] px-3 py-2 text-sm placeholder:text-[--muted-foreground] focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 [&>span]:line-clamp-1">
        <SelectPrimitive.Value
          className={className}
          placeholder={placeholder}
        />
        <SelectPrimitive.Icon asChild>
          <LuChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
        >
          <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
            <LuChevronUp className="h-4 w-4" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="bg-[--bg-accent] p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
            {options.map((option) => {
              return (
                <SelectPrimitive.Item
                  key={option.value ?? 'undefined'}
                  value={option.value}
                  className="relative hover:bg-[--fg-accent] flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <LuCheck className="h-4 w-4" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              );
            })}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
            <LuChevronDown className="h-4 w-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
