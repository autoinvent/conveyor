import type { ComponentProps } from 'react';

import {
  TableBody as STableBody,
  TableCell as STableCell,
  TableRow as STableRow,
} from '@/lib/components/ui/table';

import { useTableStore } from './useTableStore';

export interface TableFallbackProps extends ComponentProps<typeof STableBody> {}

export const TableFallback = ({ children, ...props }: TableFallbackProps) => {
  const { columnIds, data } = useTableStore();

  return (
    data.length === 0 &&
    columnIds.length > 0 && (
      <STableBody {...props}>
        <STableRow>
          <STableCell colSpan={columnIds.length}>
            {children === undefined ? (
              <div className="text-center">No Records Found.</div>
            ) : (
              children
            )}
          </STableCell>
        </STableRow>
      </STableBody>
    )
  );
};
