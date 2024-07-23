import type { ChangeEvent } from 'react';

import { SelectInput, StringInput } from '@/Form';
import type { FilterItem, SelectOption } from '@/types';

export interface ModelFilterItemProps {
  filterItem: FilterItem;
  onFilterItemChange: (changedFilterItem: FilterItem) => void;
  selectOptions: {
    path: SelectOption[];
    not: SelectOption[];
    op: SelectOption[];
  };
}

export const ModelFilterItem = ({
  filterItem,
  onFilterItemChange,
  selectOptions,
}: ModelFilterItemProps) => {
  return (
    <>
      <SelectInput
        options={selectOptions.path}
        inputProps={{
          value: filterItem.path,
          className: 'min-w-fit',
          onChange: (newPath: string) => {
            const newFilterItem = {
              path: newPath,
              not: selectOptions.not[0].value as boolean,
              op: selectOptions.op[0].value as string,
              value: '',
            };
            onFilterItemChange(newFilterItem);
          },
        }}
      />
      <SelectInput
        options={selectOptions.not}
        inputProps={{
          value: filterItem.not,
          className: 'min-w-fit',
          onChange: (newNot: boolean) => {
            const newFilterItem = {
              path: filterItem.path,
              not: newNot,
              op: filterItem.op,
              value: filterItem.value,
            };
            onFilterItemChange(newFilterItem);
          },
        }}
      />
      <SelectInput
        options={selectOptions.op}
        inputProps={{
          value: filterItem.op,
          className: 'min-w-fit',
          onChange: (newOp: string) => {
            const newFilterItem = {
              path: filterItem.path,
              not: filterItem.not,
              op: newOp,
              value: filterItem.value,
            };
            onFilterItemChange(newFilterItem);
          },
        }}
      />
      <StringInput
        inputProps={{
          value: filterItem.value,
          className: 'min-w-20',
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const newFilterItem = {
              path: filterItem.path,
              not: filterItem.not,
              op: filterItem.op,
              value: e.target.value,
            };
            onFilterItemChange(newFilterItem);
          },
        }}
      />
    </>
  );
};
