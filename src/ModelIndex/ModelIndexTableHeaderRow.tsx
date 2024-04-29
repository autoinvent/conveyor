import { TableHeaderRow, TableHeaderRowProps } from '@/Table';

import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell';
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelIndexTableHeaderRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableHeaderRowProps) => {
  const { selected } = useModelIndex((state) => ({
    fields: state.fields,
    showActions: state.showActions,
  }));
  const fields: string[] = selected.fields;
  const showActions: boolean = selected.showActions;
  return (
    <TableHeaderRow prefilled={false} {...props}>
      {children === undefined || prefilled ? (
        <>
          {fields.map((field) => {
            return <ModelIndexTableHeaderCell key={field} field={field} />;
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
