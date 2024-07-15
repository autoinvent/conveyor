import type { UseFormReturn } from 'react-hook-form';

import { useDataStore } from '@/Data';
import { FormStoreProvider, useForm } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
import { TableRow, type TableRowProps, useTableStore } from '@/Table';
import { DataLens } from '@/types';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableErrorRow } from './ModelIndexTableErrorRow';
import { ACTION_COLUMN } from './constants';

export interface ModelIndexTableRowProps extends TableRowProps {
  formMethods?: UseFormReturn;
}

export const ModelIndexTableRow = ({
  prefilled,
  formMethods,
  children,
  ...props
}: ModelIndexTableRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const data = useDataStore();
  const defaultFormMethods = useForm({ mode: 'onChange', values: data });

  return (
    <FormStoreProvider {...(formMethods ?? defaultFormMethods)}>
      <LoadingStoreProvider>
        <Lenses initialLens={DataLens.VALUE}>
          <TableRow prefilled={false} {...props}>
            {children === undefined || prefilled ? (
              <>
                {fieldNames.map((fieldName) => {
                  if (fieldName === ACTION_COLUMN) {
                    return <ModelIndexTableActionCell key={ACTION_COLUMN} />;
                  }
                  return (
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
        </Lenses>
      </LoadingStoreProvider>
      <ModelIndexTableErrorRow />
    </FormStoreProvider>
  );
};
