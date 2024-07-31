import { TableHeaderRow, type TableHeaderRowProps } from '@/Table';

import { ModelTableHead } from './ModelTableHead';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelTableHeaderRow = ({
  prefilled,
  children,
  ...tableHeaderRowProps
}: ModelTableHeaderRowProps) => {
  // TODO: investigate if better to choose fieldOrder
  const fields = useModelTableStore((state) => state.fields);
  console.log(fields);
  return (
    <TableHeaderRow prefilled={prefilled} {...tableHeaderRowProps}>
      {children === undefined ? (
        <>
          {fields.map((field) => (
            <ModelTableHead key={field} field={field} />
          ))}
        </>
      ) : (
        children
      )}
    </TableHeaderRow>
  );
};
