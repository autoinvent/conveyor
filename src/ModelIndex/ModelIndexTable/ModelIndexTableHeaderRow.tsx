import {
  TableHeaderRow,
  type TableHeaderRowProps,
  useTableStore,
} from '@/Table';

import { useModelIndexStore } from '../useModelIndexStore';

import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell';
import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableHeaderRowProps extends TableHeaderRowProps {}

export const ModelIndexTableHeaderRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableHeaderRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const showActions = useModelIndexStore((state) => state.showActions);
  return (
    <TableHeaderRow prefilled={false} {...props}>
      {children === undefined || prefilled ? (
        <>
          {fieldNames.map((fieldName) => {
            return fieldName === ACTION_COLUMN ? (
              showActions ? (
                <ModelIndexTableActionHeaderCell key={fieldName} />
              ) : null
            ) : (
              <ModelIndexTableHeaderCell
                key={fieldName}
                fieldName={fieldName}
              />
            );
          })}
          {children}
        </>
      ) : (
        children
      )}
    </TableHeaderRow>
  );
};
