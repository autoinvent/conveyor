import { useActionStore } from '@/Actions/useActionStore';
import { TableHeaderRow, type TableHeaderRowProps } from '@/Table';
import { cn } from '@/lib/utils';
import { DnDSortableContextWrapper } from '@/utils';

import { ModelTableActionHead } from './ModelTableActionHead';
import { ModelTableHead } from './ModelTableHead';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelTableHeaderRow = ({
  children,
  className,
  ...tableHeaderRowProps
}: ModelTableHeaderRowProps) => {
  const showActions = useActionStore((state) => state.showActions);
  const fields = useModelTableStore((state) => state.fields);
  const fieldOrder = useModelTableStore((state) => state.fieldOrder);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  return (
    <TableHeaderRow
      className={cn(
        'sticky top-0 z-10 bg-background shadow-bottom hover:bg-muted-subtle',
        className,
      )}
      {...tableHeaderRowProps}
    >
      <DnDSortableContextWrapper draggable={draggable} dndList={fieldOrder}>
        {children === undefined ? (
          <>
            {fields.map((field) => (
              <ModelTableHead key={field} field={field} />
            ))}
            {showActions !== false && <ModelTableActionHead />}
            {children}
          </>
        ) : (
          children
        )}
      </DnDSortableContextWrapper>
    </TableHeaderRow>
  );
};
