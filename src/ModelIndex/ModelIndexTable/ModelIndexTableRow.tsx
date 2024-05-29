import { FormProvider, useForm } from 'react-hook-form';

import { useDataStore } from '@/Data';
import { Lenses, DataLens } from '@/Lenses';
import { TableRow, type TableRowProps, useTableStore } from '@/Table';

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
  const methods = useForm({ mode: 'onChange', defaultValues: data });

  return (
    <Lenses initialLens={DataLens.DISPLAY}>
      <TableRow prefilled={false} {...props}>
        <FormProvider {...methods}>
          {children === undefined || prefilled ? (
            <>
              {fieldNames.map((fieldName) => {
                return fieldName === ACTION_COLUMN ? (
                  showActions ? (
                    <ModelIndexTableActionCell key={fieldName} />
                  ) : null
                ) : (
                  <ModelIndexTableCell key={fieldName} fieldName={fieldName} />
                );
              })}
              {children}
            </>
          ) : (
            children
          )}
        </FormProvider>
      </TableRow>
      <ModelIndexTableErrorRow errors={methods.formState.errors} />
    </Lenses>
  );
};
