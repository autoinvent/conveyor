import { Lens, DataLens } from '@/Lenses';
import { Slot } from '@/Slots';
import { Field } from '@/types';

import { ModelFormInput } from './ModelFormInput';
import { ModelFormValue } from './ModelFormValue';
import { useModelForm } from './useModelForm';

export interface ModelFormFieldProps {
  fieldName: string;
}

export const ModelFormField = ({ fieldName }: ModelFormFieldProps) => {
  const {
    selected: { fields, onOpenFieldSelect },
  } = useModelForm((state) => ({
    fields: state.fields,
    onOpenFieldSelect: state.onOpenFieldSelect,
  }));
  const field: Field = fields.find((field: Field) => field.name === fieldName);
  return (
    <Slot slot={fieldName}>
      <div className="flex min-w-[300px] basis-1/2 px-2 my-2">
        <label
          key={fieldName}
          className="flex w-full rounded-md border border-[--border-color]"
        >
          <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
            {fieldName}
          </span>
          <Lens lens={DataLens.DISPLAY}>
            <ModelFormValue
              field={field}
              className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
            />
          </Lens>
          <Lens lens={DataLens.EDITING}>
            {field.editable ? (
              <ModelFormInput
                field={field}
                onOpenFieldSelect={onOpenFieldSelect}
                className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
              />
            ) : (
              <ModelFormValue
                field={field}
                className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
              />
            )}
          </Lens>
        </label>
      </div>
    </Slot>
  );
};
