import { TableHeaderRow, TableHeaderRowProps, useTable } from '@/Table';

import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell';
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { useModelIndex } from './useModelIndex';
import { ACTION_SLOT } from './constants';

export interface ModelIndexTableHeaderRowProps extends TableHeaderRowProps { }

export const ModelIndexTableHeaderRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableHeaderRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds)
  const { selected: showActions } = useModelIndex((state) => (state.showActions));
  return (
    <TableHeaderRow prefilled={false} {...props}>
      {children === undefined || prefilled ? (
        <>
          {columnIds.map((columnId: string) => {
            if (columnId === ACTION_SLOT) return <ModelIndexTableActionHeaderCell key={ACTION_SLOT} />
            return <ModelIndexTableHeaderCell key={columnId} field={columnId} />;
          })}
          {children}
        </>
      ) : (
        children
      )}
      {showActions ? <ModelIndexTableActionHeaderCell /> : null}
    </TableHeaderRow>
  );
};
