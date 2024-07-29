import type { ComponentProps } from 'react';

import { STableBody, STableCell, STableRow } from '@/lib/components/ui/table';

import { Spinner } from '@/Loading';

import { useTableStore } from './useTableStore';

export interface TableFallbackProps extends ComponentProps<typeof STableBody> {}

export const TableFallback = ({ children, ...props }: TableFallbackProps) => {
  const { columnIds, data } = useTableStore();

  return (
    (!data || data.length === 0) &&
    columnIds.length > 0 && (
      <STableBody {...props}>
        <STableRow>
          <STableCell colSpan={columnIds.length}>
            {children === undefined ? (
              <div className="text-center">
                {data ? 'No Records Found.' : <Spinner />}
              </div>
            ) : (
              children
            )}
          </STableCell>
        </STableRow>
      </STableBody>
    )
  );
};
