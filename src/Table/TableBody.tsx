import { useStore } from '@tanstack/react-store';

import { DataContext } from '@/Data';
import { CommonProps, WrapperProp } from '@/types';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTableStore } from './useTableStore';

export interface TableBodyProps extends WrapperProp, CommonProps {}

export const TableBody = ({
  children,
  id,
  className,
  style,
}: TableBodyProps) => {
  const tableStore = useTableStore();
  const data = useStore(tableStore, (state) => state.data);
  return (
    <tbody id={id} className={className} style={style}>
      {data.map((rowData) => {
        const rowKey = `table-row-${generateUID()}`;
        return (
          <DataContext.Provider key={rowKey} value={rowData}>
            {children === undefined ? <TableRow /> : children}
          </DataContext.Provider>
        );
      })}
    </tbody>
  );
};
