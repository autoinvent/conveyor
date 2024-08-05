import { TableHeaderRow, type TableHeaderRowProps } from '@/Table';
import { DnDSortableContextWrapper } from '@/utils';

import { ModelTableHead } from './ModelTableHead';
import { useModelTableStore } from './useModelTableStore';
import { ACTION_COLUMN } from './ModelTable';
import { ModelTableActionHead } from './ModelTableActionHead';

export interface ModelTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelTableHeaderRow = ({
  prefilled,
  children,
  ...tableHeaderRowProps
}: ModelTableHeaderRowProps) => {
  const renderedFields = useModelTableStore(
    (state) => state.tableOptions?.fieldOrder ?? state.fields,
  );
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  return (
    <TableHeaderRow prefilled={prefilled} {...tableHeaderRowProps}>
      <DnDSortableContextWrapper draggable={draggable} dndList={renderedFields}>
        {children === undefined ? (
          <>
            {renderedFields.map((field) => {
              if (field === ACTION_COLUMN)
                return <ModelTableActionHead key={ACTION_COLUMN} />;
              return <ModelTableHead key={field} field={field} />;
            })}
          </>
        ) : (
          children
        )}
      </DnDSortableContextWrapper>
    </TableHeaderRow>
  );
};
