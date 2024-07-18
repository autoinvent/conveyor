import { FormInput, FormStoreProvider, SelectInput, useForm } from '@/Form';
import type { FilterItem, SelectOption } from '@/types';

export interface ModelFilterItemProps {
  filterItem?: Partial<FilterItem>;
  onFilterItemChange: (currFilterItem: FilterItem) => void;
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
    values: {
      path: filterItem?.path ?? selectOptions.path[0].value,
      not: filterItem?.not ?? selectOptions.not[0].value,
      op: filterItem?.op ?? selectOptions.op[0].value,
      value: filterItem?.value ?? '',
    },
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
                  path: filterItem?.path,
                  not: newNot,
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
          name="op"
          render={(props) => (
            <SelectInput options={selectOptions.op} {...props} />
          )}
        />
      </FormStoreProvider>
    </>
  );
};
