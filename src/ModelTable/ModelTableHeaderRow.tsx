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
    <TableHeaderRow prefilled={prefilled} {...tableHeaderRowProps} className='sticky top-0 z-10 bg-white shadow-[0_0px_0.5px_1px_#e2e8f0] hover:bg-muted'>
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
