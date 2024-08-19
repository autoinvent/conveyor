import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { Slot } from '@/Slots';
import { TableHead as STableHead } from '@/lib/components/ui/table';
import { humanizeText } from '@/utils';

export interface TableHeadProps
  extends ComponentPropsWithoutRef<typeof STableHead> {
  columnId: string;
}

export const TableHead = forwardRef<
  ElementRef<typeof STableHead>,
  TableHeadProps
>(({ columnId, children, ...htmlProps }, ref) => {
  return (
    <Slot slotKey={columnId}>
      <STableHead ref={ref} {...htmlProps}>
        {children === undefined ? humanizeText(columnId) : children}
      </STableHead>
    </Slot>
  );
});
