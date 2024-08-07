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
  const resolver = useModelTableStore((state) => state.formOptions?.resolver);
  const fields = useModelTableStore((state) => state.fields);
  const readOnly = useModelTableStore((state) => state.tableOptions.readOnly);
  const fieldOrder = useModelTableStore(
    (state) => state.tableOptions.fieldOrder,
  );
  const draggable = useModelTableStore((state) => state.tableOptions.draggable);
  const data = useDataStore();
  const defaultFormMethods = useForm({
    mode: 'onChange',
    values: data,
    resolver,
  });

  return (
    <FormStoreProvider {...(formMethods ?? defaultFormMethods)}>
      <LoadingStoreProvider>
        <Lenses initialLens={DataLens.VALUE}>
          <TableRow prefilled={false} {...props}>
            <DnDSortableContextWrapper
              draggable={draggable ?? true}
              dndList={fieldOrder}
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
