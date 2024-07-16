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
      path: filterItem?.path ?? selectOptions.path[0],
      not: filterItem?.not ?? selectOptions.path[0],
      op: filterItem?.op ?? selectOptions.path[0],
    },
  });
  return (
    <>
      <FormStoreProvider {...formMethods}>
        <FormInput
          name="path"
          render={(props) => (
            <SelectInput options={selectOptions.path} {...props} />
          )}
        />
        <FormInput
          name="not"
          render={(props) => (
            <SelectInput options={selectOptions.not} {...props} />
          )}
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
