import { FormInput, FormStoreProvider, SelectInput, useForm } from '@/Form';
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
  const formMethods = useForm({
    values: filterItem,
  });
  return (
    <>
      <FormStoreProvider {...formMethods}>
        <FormInput
          name="path"
          render={({ inputProps, ...props }) => {
            const newInputProps = Object.assign(inputProps, {
              onChange: (newPath: string) => {
                const newFilterItem = {
                  path: newPath,
                  not: selectOptions.not[0].value as boolean,
                  op: selectOptions.op[0].value as string,
                  value: '',
                };
                onFilterItemChange(newFilterItem);
              },
            });
            return (
              <SelectInput
                options={selectOptions.path}
                inputProps={newInputProps}
                {...props}
              />
            );
          }}
        />
        <FormInput
          name="not"
          render={({ inputProps, ...props }) => {
            const newInputProps = Object.assign(inputProps, {
              onChange: (newNot: boolean) => {
                const newFilterItem = {
                  path: filterItem.path,
                  not: newNot,
                  op: filterItem.op,
                  value: filterItem.value,
                };
                onFilterItemChange(newFilterItem);
              },
            });
            return (
              <SelectInput
                options={selectOptions.not}
                inputProps={newInputProps}
                {...props}
              />
            );
          }}
        />
        <FormInput
          name="op"
          render={({ inputProps, ...props }) => {
            const newInputProps = Object.assign(inputProps, {
              onChange: (newOp: string) => {
                const newFilterItem = {
                  path: filterItem.path,
                  not: filterItem.not,
                  op: newOp,
                  value: filterItem.value,
                };
                onFilterItemChange(newFilterItem);
              },
            });
            return (
              <SelectInput
                options={selectOptions.op}
                inputProps={newInputProps}
                {...props}
              />
            );
          }}
        />
      </FormStoreProvider>
    </>
  );
};
