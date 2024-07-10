import type { UseFormProps } from 'react-hook-form';

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

export interface ModelIndexTableRowProps extends TableRowProps {
  formOptions?: UseFormProps;
}

export const ModelIndexTableRow = ({
  prefilled,
  formOptions,
  children,
  ...props
}: ModelIndexTableRowProps) => {
  const fieldNames = useTableStore((state) => state.columnIds);
  const readOnly = useModelIndexStore((state) => state.readOnly);
  const data = useDataStore();
  const formProps = Object.assign(
    { mode: 'onChange', values: data },
    formOptions,
  );

  return (
    <FormStoreProvider {...formProps}>
      <LoadingStoreProvider>
        <Lenses initialLens={DataLens.VALUE}>
          <TableRow prefilled={false} {...props}>
            {children === undefined || prefilled ? (
              <>
                {fieldNames.map((fieldName) => {
                  return fieldName === ACTION_COLUMN ? (
                    readOnly && <ModelIndexTableActionCell key={fieldName} />
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
        </Lenses>
      </LoadingStoreProvider>
      <ModelIndexTableErrorRow />
    </FormStoreProvider>
  );
};
