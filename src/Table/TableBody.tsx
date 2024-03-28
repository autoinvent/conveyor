import { useStore } from '@tanstack/react-store';

import { DataContext } from '@/Data';
import { Lenses } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';
import { generateUID } from '@/utils';

import { useTableStore } from './useTableStore';

export enum TableBodyLens {
  HAS_DATA = 'has-data',
  HAS_NO_DATA = 'has-no-data',
}

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
      <Lenses
        activeLens={
          data.length > 0 ? TableBodyLens.HAS_DATA : TableBodyLens.HAS_NO_DATA
        }
      >
        {data.length > 0
          ? data.map((rowData) => {
              const rowKey = `table-row-${generateUID()}`;
              return (
                <DataContext.Provider key={rowKey} value={rowData}>
                  {children}
                </DataContext.Provider>
              );
            })
          : children}
      </Lenses>
    </tbody>
  );
};
