import type { UseFormReturn } from 'react-hook-form';

import { useDataStore } from '@/Data';
import { FormStoreProvider, useForm } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
import { TableRow, type TableRowProps } from '@/Table';
import { DataLens } from '@/types';
import { DnDSortableContextWrapper } from '@/utils';

import { ACTION_COLUMN } from './ModelTable';
import { ModelTableActionCell } from './ModelTableActionCell';
import { ModelTableCell } from './ModelTableCell';
import { ModelTableErrorRow } from './ModelTableErrorRow';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableRowProps extends TableRowProps {
  formMethods?: UseFormReturn;
}

export const ModelTableRow = ({
  prefilled,
  formMethods,
  children,
  ...props
}: ModelTableRowProps) => {
  const renderedFields = useModelTableStore(
    (state) => state.tableOptions?.fieldOrder ?? state.fields,
  );
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  const data = useDataStore();
  const defaultFormMethods = useForm({ mode: 'onChange', values: data });

  return (
    <FormStoreProvider {...(formMethods ?? defaultFormMethods)}>
      <LoadingStoreProvider>
        <Lenses initialLens={DataLens.VALUE}>
          <TableRow prefilled={false} {...props}>
            <DnDSortableContextWrapper
              draggable={draggable}
              dndList={renderedFields}
            >
              {children === undefined || prefilled ? (
                <>
                  {renderedFields.map((field) => {
                    if (field === ACTION_COLUMN)
                      return <ModelTableActionCell key={ACTION_COLUMN} />;
                    return <ModelTableCell key={field} field={field} />;
                  })}
                  {children}
                </>
              ) : (
                children
              )}
            </DnDSortableContextWrapper>
          </TableRow>
        </Lenses>
      </LoadingStoreProvider>
      <ModelTableErrorRow />
    </FormStoreProvider>
  );
};
