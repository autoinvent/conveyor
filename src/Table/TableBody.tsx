import { useStore } from '@tanstack/react-store';

import { FormProvider } from '@/Form';
import { CommonProps, WrapperProp } from '@/types';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTableStore } from './useTableStore';

export interface TableBodyProps extends WrapperProp, CommonProps { }

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
          <FormProvider key={rowKey} defaultValues={rowData}>
            {children === undefined ? <TableRow /> : children}
          </FormProvider>
        );
      })}
    </tbody>
  );
};
