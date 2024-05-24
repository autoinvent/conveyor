import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useData } from '@/Data';
import { useIsFirstRender } from '@/hooks';
import { Lenses, DataLens } from '@/Lenses';
import { TableRow, type TableRowProps, useTable } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableErrorRow } from './ModelIndexTableErrorRow';
import { ACTION_SLOT } from './constants';

export interface ModelIndexTableRowProps extends TableRowProps {}

export const ModelIndexTableRow = ({
  prefilled,
  children,
  ...props
}: ModelIndexTableRowProps) => {
  const { selected: columnIds } = useTable((state) => state.columnIds);
  const data = useData();
  const methods = useForm({ mode: 'onChange', defaultValues: data });

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender.current) {
      methods.reset(data);
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <Lenses initialLens={DataLens.DISPLAY}>
        <TableRow prefilled={false} {...props}>
          {children === undefined || prefilled ? (
            <>
              {columnIds.map((columnId: string) => {
                if (columnId === ACTION_SLOT) {
                  return <ModelIndexTableActionCell key={ACTION_SLOT} />;
                }
                return (
                  <ModelIndexTableCell key={columnId} fieldName={columnId} />
                );
              })}
              {children}
            </>
          ) : (
            children
          )}
        </TableRow>
        <ModelIndexTableErrorRow />
      </Lenses>
    </FormProvider>
  );
};
