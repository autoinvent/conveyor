import type { ComponentProps } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { FormStoreProvider, useForm } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
import { DataLens, type DataType } from '@/types';

import { cn } from '@/lib/utils';
import { ModelFormActions } from './ModelFormActions';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormFallback } from './ModelFormFallback';
import { ModelFormField } from './ModelFormField';
import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';

export interface ModelFormProps<D extends DataType, F extends string>
  extends ModelFormState<D, F>,
    Omit<ComponentProps<'form'>, 'onSubmit'> {
  formMethods?: UseFormReturn;
}

export const ModelForm = Object.assign(
  <D extends DataType, F extends string>({
    fields,
    data,
    readOnly = false,
    onCreate,
    onUpdate,
    onDelete,
    onEdit,
    onCancelEdit,
    initialLens = DataLens.INPUT,
    children,
    formMethods,
    className,
    ...htmlProps
  }: ModelFormProps<D, F>) => {
    const defaultFormMethods = useForm({ mode: 'onChange', values: data });
    return (
      <ModelFormStoreProvider
        fields={fields}
        data={data}
        readOnly={readOnly}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onEdit={onEdit}
        onCancelEdit={onCancelEdit}
        initialLens={initialLens}
      >
        <FormStoreProvider {...(formMethods ?? defaultFormMethods)}>
          <LoadingStoreProvider>
            <Form className={cn('space-y-4', className)} {...htmlProps}>
              <Lenses initialLens={initialLens}>
                {children === undefined ? (
                  <>
                    <ModelFormContent />
                    <ModelFormActions />
                    <ModelFormFallback />
                  </>
                ) : (
                  children
                )}
              </Lenses>
            </Form>
          </LoadingStoreProvider>
        </FormStoreProvider>
      </ModelFormStoreProvider>
    );
  },
  {
    Actions: ModelFormActions,
    Content: ModelFormContent,
    Fallback: ModelFormFallback,
    Field: ModelFormField,
  },
);

interface FormProps extends ComponentProps<'form'> {}

const Form = ({ children, ...htmlProps }: FormProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} {...htmlProps}>
      {children}
    </form>
  );
};
