import { Lenses, DataLens } from '@/Lenses';
import { TableRow, TableRowProps, useTable } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ACTION_SLOT } from './constants';

export interface ModelIndexTableRowProps extends TableRowProps {}

export const ModelIndexTableRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  return (
    <Lenses activeLens={DataLens.DISPLAY}>
      <TableRow prefilled={false} {...props}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId: string) => {
              if (columnId === ACTION_SLOT)
                return <ModelIndexTableActionCell key={ACTION_SLOT} />;
              return (
                <ModelIndexTableCell key={columnId} fieldName={columnId} />
              );
            })}
            {children}
          </>
        ) : (
          children
        )}
      </TableRow>
    </Lenses>
  );
};
