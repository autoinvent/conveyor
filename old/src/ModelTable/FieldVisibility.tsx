import type { ReactNode } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import { humanizeText, toggleFieldVisibility } from '@/utils';

import { ACTION_COLUMN } from './ModelTable';
import type { ColumnOptions } from './ModelTableStoreContext';

export interface FieldVisibilityProps<F extends string, T extends F> {
  fields: readonly F[];
  fieldOrder: T[];
  onFieldOrderChange: (newFieldOrder: T[]) => void;
  options?: Partial<
    Record<T, Pick<ColumnOptions, 'label' | 'hidable' | 'hidden'>>
  >;
  children?: ReactNode;
}

export const FieldVisibility = <F extends string, T extends F>({
  fields,
  fieldOrder,
  onFieldOrderChange,
  options,
  children,
}: FieldVisibilityProps<F, T>) => {
  const isFiltered = fields.length !== fieldOrder.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm" className="h-8">
            {isFiltered ? (
              <EyeOff className="mr-2 h-4 w-4" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            View
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="overflow-y-auto p-0 pr-1 [&::-webkit-scrollbar-thumb]:rounded-3xl [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
          {fields
            .filter(
              (field) =>
                (options?.[field]?.hidable ?? true) &&
                !options?.[field]?.hidden,
            )
            .map((field) => {
              return (
                <DropdownMenuCheckboxItem
                  key={field}
                  checked={fieldOrder.includes(field as T)}
                  onCheckedChange={() => {
                    const newFieldOrder = toggleFieldVisibility({
                      fieldOrder,
                      field,
                    });
                    if (newFieldOrder.includes(ACTION_COLUMN)) {
                      newFieldOrder.splice(
                        newFieldOrder.indexOf(ACTION_COLUMN),
                        1,
                      );
                      newFieldOrder.push(ACTION_COLUMN);
                    }
                    onFieldOrderChange(newFieldOrder as T[]);
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  {options?.[field]?.label ?? humanizeText(field)}
                </DropdownMenuCheckboxItem>
              );
            })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
