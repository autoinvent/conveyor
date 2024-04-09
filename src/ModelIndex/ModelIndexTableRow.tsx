import { useStore } from '@tanstack/react-store';

import { Lenses, DataLens } from '@/Lenses';
import { TableRow, TableRowProps, useTableStore } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';

export interface ModelIndexTableRowProps extends TableRowProps { }

export const ModelIndexTableRow = ({
  prefilled,
  children,
  id,
  className,
  style,
}: ModelIndexTableRowProps) => {
  const tableStore = useTableStore();
  const columnIds = useStore(tableStore, (state) => state.columnIds);
  return (
    <Lenses activeLens={DataLens.DISPLAY}>
      <TableRow prefilled={false} id={id} className={className} style={style}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <ModelIndexTableCell key={columnId} field={columnId} />;
            })}
            <ModelIndexTableActionCell />
            {children}
          </>
        ) : (
          children
        )}
      </TableRow>
    </Lenses>
  );
};
