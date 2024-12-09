import { useForm } from 'react-hook-form';

import { useDataStore } from '@/Data';
import { FormStoreProvider } from '@/Form';
import { Lenses } from '@/Lenses';
import { TableRow, type TableRowProps } from '@/Table';
import { DataLens } from '@/types';
import { DnDSortableContextWrapper } from '@/utils';

import { ModelTableActionCell } from './ModelTableActionCell';
import { ModelTableCell } from './ModelTableCell';
import { ModelTableErrorRow } from './ModelTableErrorRow';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableRowProps extends TableRowProps {}

export const ModelTableRow = ({
  prefilled,
  children,
  ...props
}: ModelTableRowProps) => {
  const fields = useModelTableStore((state) => state.fields);
  const fieldOrder = useModelTableStore((state) => state.fieldOrder);
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable,
  );
  const formOptions = useModelTableStore((state) => state.formOptions);
  const selectedRows = useModelTableStore((state) => state.selectedRows);
  const data = useDataStore();
  const formMethods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
    values: data,
    ...formOptions,
    errors: formOptions?.errors?.[data.id],
  });
  return (
    <FormStoreProvider id={data.id} {...formMethods}>
      <Lenses initialLens={DataLens.DISPLAY}>
        <TableRow
          prefilled={false}
          className={`${selectedRows?.includes(data.id) && 'bg-accent'}`}
          {...props}
        >
          <DnDSortableContextWrapper
            draggable={draggable ?? true}
            dndList={fieldOrder}
          >
            {children === undefined || prefilled ? (
              <>
                {fields.map((field) => (
                  <ModelTableCell key={field} field={field} />
                ))}
                {!readOnly && <ModelTableActionCell />}
                {children}
              </>
            ) : (
              children
            )}
          </DnDSortableContextWrapper>
        </TableRow>
      </Lenses>
      <ModelTableErrorRow />
    </FormStoreProvider>
  );
};
