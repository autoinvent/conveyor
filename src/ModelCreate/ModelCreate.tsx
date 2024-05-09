import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { DataType } from '@/Data';
import { SelectOption, FormInput } from '@/Form';
import { Field, OnSaveProps } from '@/types';

export interface ModelCreateProps {
  fields: Field[];
  title?: ReactNode;
  onCreate?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onCancel?: () => void;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
}

export const ModelCreate = ({
  fields,
  title,
  onCreate,
  onCancel,
  onOpenFieldSelect,
}: ModelCreateProps) => {
  const fieldNames = fields.map((field) => field.name);
  const {
    formState: { dirtyFields },
    handleSubmit,
  } = useFormContext();

  const onCreateHandler = (formData: DataType) => {
    onCreate?.({ data: formData, dirtyFields });
  };

  return (
    <>
      <h2 className="w-full text-left font-semibold text-4xl whitespace-nowrap">{title}</h2>
      <form className='whitespace-nowrap'onSubmit={handleSubmit(onCreateHandler)}>
        <div className="flex">
          <div className="block w-full md:w-1/2 min-w-[400px] pr-4 inset-y-0">
            {fieldNames
              .slice(0, Math.ceil(fieldNames.length / 2))
              .map((fieldName) => (
                <label
                  key={fieldName}
                  className="flex w-full rounded-md border border-[--border-color] my-6"
                >
                  <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
                    {fieldName}
                  </span>
                  <FormInput
                    field={
                      fields.find(
                        (field: Field) => field.name === fieldName,
                      ) as Field
                    }
                    onOpenFieldSelect={onOpenFieldSelect}
                    className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
                  />
                </label>
              ))}
          </div>
          <div className="block w-full md:w-1/2 min-w-[400px] pl-4 inset-y-0">
            {fieldNames
              .slice(Math.ceil(fieldNames.length / 2))
              .map((fieldName) => (
                <label
                  key={fieldName}
                  className="flex w-full rounded-md border border-[--border-color] my-6"
                >
                  <span className="bg-[--fg-color] py-1.5 px-3 w-[200px] border border-transparent text-center rounded-l-md">
                    {fieldName}
                  </span>
                  <FormInput
                    field={
                      fields.find(
                        (field: Field) => field.name === fieldName,
                      ) as Field
                    }
                    onOpenFieldSelect={onOpenFieldSelect}
                    className="flex-1 bg-[--bg-accent] text-[--text-color] border border-transparent outline-none p-1.5 border-l-[--border-color] rounded-r-md"
                  />
                </label>
              ))}
          </div>
        </div>
        <button className='bg-[--success] rounded-l-md border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark]' type="submit">Create</button>
        <button className='bg-[--primary] rounded-r-md border-[--primary] hover:bg-[--primary-dark] hover:border-[--primary-dark]' type="button" onClick={() => onCancel?.()}>
          Cancel
        </button>
      </form>
    </>
  );
};
