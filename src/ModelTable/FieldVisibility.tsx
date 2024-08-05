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

export interface FieldVisibilityProps<F extends string> {
  fields: F[];
  fieldOrder: F[];
  onFieldOrderChange: (newFieldOrder: F[]) => void;
  options?: Partial<Record<F, { hidable?: boolean }>>;
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
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fields
          .filter((field) => options?.[field]?.hidable ?? true)
          .map((field) => {
            return (
              <DropdownMenuCheckboxItem
                key={field}
                className="capitalize"
                checked={fieldOrder.includes(field)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFieldOrderChange(fieldOrder.concat(field));
                  } else {
                    const fieldIdx = fieldOrder.indexOf(field);
                    onFieldOrderChange(fieldOrder.toSpliced(fieldIdx, 1));
                  }
                }}
                onSelect={(e) => e.preventDefault()}
              >
                {field}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
