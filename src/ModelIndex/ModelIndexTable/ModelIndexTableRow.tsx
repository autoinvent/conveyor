import { useDataStore } from '@/Data';
import { FormStoreProvider } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
import { TableRow, type TableRowProps, useTableStore } from '@/Table';
import { DataLens } from '@/types';

import { useModelIndexStore } from '../useModelIndexStore';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableErrorRow } from './ModelIndexTableErrorRow';
import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableRowProps extends TableRowProps {}

export const ModelIndexTableRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const showActions = useModelIndexStore((state) => state.showActions);
  const data = useDataStore();

  return (
    <FormStoreProvider mode="onChange" defaultValues={data}>
      <Lenses initialLens={DataLens.VALUE}>
        <LoadingStoreProvider>
          <TableRow prefilled={false} {...props}>
            {children === undefined || prefilled ? (
              <>
                {fieldNames.map((fieldName) => {
                  return fieldName === ACTION_COLUMN ? (
                    showActions ? (
                      <ModelIndexTableActionCell key={fieldName} />
                    ) : null
                  ) : (
                    <ModelIndexTableCell
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
          </TableRow>
        </LoadingStoreProvider>
        <ModelIndexTableErrorRow />
      </Lenses>
    </FormStoreProvider>
  );
};
