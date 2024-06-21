import type { ComponentProps } from 'react';

import { Spinner } from '@/Loading';

import { useTableStore } from './useTableStore';

export interface TableFallbackProps extends ComponentProps<'tbody'> {}

export const TableFallback = ({
  className,
  children,
  ...props
}: TableFallbackProps) => {
  const { columnIds, data } = useTableStore();

  return (
    (!data || data.length === 0) &&
    columnIds.length > 0 && (
      <tbody className={className} {...props}>
        <tr>
          <td className="border border-border p-1.5" colSpan={columnIds.length}>
            {children === undefined ? (
              data ? (
                <div className="text-center">No Records Found.</div>
              ) : (
                <Spinner />
              )
            ) : (
              children
            )}
          </td>
        </tr>
      </tbody>
    )
  );
};
