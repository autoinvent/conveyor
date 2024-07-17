import { TableHeaderCell, type TableHeaderCellProps } from '@/Table';
import { humanizeText } from '@/utils';

import { SortWrapper } from '../SortWrapper';
import { useModelIndexStore } from '../useModelIndexStore';
import { getFieldSortDirection, getNextSort } from '../utils';

export interface ModelIndexTableHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {
  fieldName: string;
}

export const ModelIndexTableHeaderCell = ({
  fieldName,
  children,
  ...props
}: ModelIndexTableHeaderCellProps) => {
  const field = useModelIndexStore((state) =>
    state.fields.find((field) => field.name === fieldName),
  );

  const sort = useModelIndexStore(
    (state) => state.tableViewOptions.tableView.sort,
  );
  const onTableViewChange = useModelIndexStore(
    (state) => state.tableViewOptions.onTableViewChange,
  );
  const sortDirection = getFieldSortDirection(sort, fieldName);
  const onNextSortDirection = () => {
    const nextSort = getNextSort(sort, fieldName);
    onTableViewChange({ sort: nextSort });
  };

  if (field === undefined) {
    return null;
  }

  return (
    <TableHeaderCell columnId={fieldName} {...props}>
      {children === undefined ? (
        <SortWrapper
          sortDirection={sortDirection}
          onNextSortDirection={onNextSortDirection}
          sortable={field.sortable}
        >
          {humanizeText(fieldName)}
        </SortWrapper>
      ) : (
        children
      )}
    </TableHeaderCell>
  );
};
