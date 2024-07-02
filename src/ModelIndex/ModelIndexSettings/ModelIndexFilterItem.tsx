import { Plus } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { FormInput, useFormStore, StringInput } from '@/Form';

import { useModelIndexStore } from '../useModelIndexStore';

import { FilterOperationInput } from './FilterOperationInput';
import { FilterPathInput } from './FilterPathInput';
import { FilterNotInput } from './FilterNotInput';

export const ModelIndexFilterItem = () => {
  const fields = useModelIndexStore((state) => state.fields);
  const watch = useFormStore((state) => state.watch);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const isValid = useFormStore((state) => state.formState.isValid);
  const path = watch('path');

  const onAddFilter = (formData: any) => {
    console.log(formData);
  };
  return (
    <div className="flex space-x-2">
      <FormInput
        name="path"
        rules={{ required: 'Field is required.' }}
        render={(props) => (
          <FilterPathInput
            fieldNames={fields.map((field) => field.name)}
            {...props}
          />
        )}
      />
      <FormInput name="not" render={(props) => <FilterNotInput {...props} />} />
      <FormInput
        name="op"
        rules={{ required: 'Operation is required.' }}
        render={(props) => (
          <FilterOperationInput fields={fields} required={true} {...props} />
        )}
      />
      <FormInput
        name="value"
        disabled={!path}
        render={(props) =>
          StringInput({ placeholder: 'Enter value...', ...props })
        }
      />
      <Button
        type="submit"
        disabled={!isValid}
        onClick={handleSubmit(onAddFilter)}
        variant="outline-success"
        className="px-2"
      >
        <Plus />
      </Button>
    </div>
  );
};
