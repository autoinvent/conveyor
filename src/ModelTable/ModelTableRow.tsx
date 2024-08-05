import type { UseFormReturn } from 'react-hook-form';

import { useDataStore } from '@/Data';
import { FormStoreProvider, useForm } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
import { TableRow, type TableRowProps } from '@/Table';
import { DataLens } from '@/types';
import { DnDSortableContextWrapper } from '@/utils';

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
  const fields = useModelTableStore((state) => state.fields);
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
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
                  {fields.map((field) => (
                    <ModelTableCell key={field} field={field} />
                  ))}
                  {children}
                  {!readOnly && <ModelTableActionCell />}
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
