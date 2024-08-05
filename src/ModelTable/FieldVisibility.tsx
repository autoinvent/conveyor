import { Eye } from 'lucide-react';

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

import type { ColumnOptions } from './ModelTableStoreContext';
import { ACTION_COLUMN } from './ModelTable';

export interface FieldVisibilityProps<F extends string> {
  fields: F[];
  fieldOrder: F[];
  onFieldOrderChange: (newFieldOrder: F[]) => void;
  options?: Partial<Record<F, ColumnOptions>>;
}

export const FieldVisibility = <F extends string>({
  fields,
  fieldOrder,
  onFieldOrderChange,
  options,
}: FieldVisibilityProps<F>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fields
          .filter((field) => options?.[field]?.hidable ?? true)
          .map((field) => {
            return (
              <DropdownMenuCheckboxItem
                key={field}
                className="capitalize"
                checked={fieldOrder.includes(field)}
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
                  onFieldOrderChange(newFieldOrder as F[]);
                }}
                onSelect={(e) => e.preventDefault()}
              >
                {options?.[field]?.label ?? humanizeText(field)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
