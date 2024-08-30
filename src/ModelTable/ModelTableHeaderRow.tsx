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
  const fieldOrder = useModelTableStore((state) => state.fieldOrder);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  return (
    <TableHeaderRow prefilled={prefilled} {...tableHeaderRowProps}>
      <DnDSortableContextWrapper draggable={draggable} dndList={fieldOrder}>
        {children === undefined ? (
          <>
            {fields.map((field) => (
              <ModelTableHead key={field} field={field} />
            ))}
            {!readOnly && <ModelTableActionHead />}
            {children}
          </>
        ) : (
          children
        )}
      </DnDSortableContextWrapper>
    </TableHeaderRow>
  );
};
