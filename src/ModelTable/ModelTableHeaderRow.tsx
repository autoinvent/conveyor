import { TableHeaderRow, type TableHeaderRowProps } from '@/Table';

import { ModelTableHead } from './ModelTableHead';
import { useModelTableStore } from './useModelTableStore';
import { DnDSortableContextWrapper } from './Wrappers/DnDSortableContextWrapper';

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
    <DnDSortableContextWrapper draggable={draggable} dndList={renderedFields}>
      <TableHeaderRow prefilled={prefilled} {...tableHeaderRowProps}>
        {children === undefined ? (
          <>
            {renderedFields.map((field) => (
              <ModelTableHead key={field} field={field} />
            ))}
          </>
        ) : (
          children
        )}
      </TableHeaderRow>
    </DnDSortableContextWrapper>
  );
};
