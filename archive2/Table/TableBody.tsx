import { ReactNode, useContext } from 'react';

import { DataProvider } from '@/Data';
import { BaseComponentProps } from '@/types';

import { TableContext } from './TableContext';
import { TableRow } from './TableRow';

export interface TableBodyProps extends BaseComponentProps {
  repeat?: boolean;
  children?: ReactNode;
}

// Table Body that repeats the content (children) per row of data and preps the
// DataProvider for each row to use their correspondant data
export const TableBody = ({
  repeat = true,
  children,
  id,
  className,
  style,
}: TableBodyProps) => {
  const { data } = useContext(TableContext);
  return data.length > 0 ? (
    <tbody id={id} className={className} style={style}>
      {repeat
        ? data.map((rowData, index) => {
            return (
              <DataProvider key={index} value={rowData}>
                {children === undefined ? <TableRow /> : children}
              </DataProvider>
            );
          })
        : children}
    </tbody>
  ) : null;
};
