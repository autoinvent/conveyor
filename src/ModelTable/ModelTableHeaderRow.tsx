import { TableHeaderRow, type TableHeaderRowProps } from '@/Table';
import { DnDSortableContextWrapper } from '@/utils';

import { ModelTableActionHead } from './ModelTableActionHead';
import { ModelTableHead } from './ModelTableHead';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelTableHeaderRow = ({
  prefilled,
  children,
  ...tableHeaderRowProps
}: ModelTableHeaderRowProps) => {
  const fields = useModelTableStore((state) => state.fields);
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
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
            {fields.map((field) => (
              <ModelTableHead key={field} field={field} />
            ))}
            {children}
          </>
        ) : (
          children
        )}
      </DnDSortableContextWrapper>
      {!readOnly && <ModelTableActionHead />}
    </TableHeaderRow>
  );
};
