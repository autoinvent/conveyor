import type { ComponentProps } from 'react';
import type { UseFormProps } from 'react-hook-form';

import { FormStoreProvider, useFormStore } from '@/Form';
import { Lenses } from '@/Lenses';
import { LoadingStoreProvider, useLoadingStore } from '@/Loading';
import { DataLens, type DataType, type Field } from '@/types';
import { toField } from '@/utils';

import { ModelFormActions } from './ModelFormActions';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormField } from './ModelFormField';
import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';
import { ModelFormTitle } from './ModelFormTitle';
import { useModelFormStore } from './useModelFormStore';
import { ModelFormFallback } from './ModelFormFallback';

export interface ModelFormProps<D extends DataType>
  extends Omit<ModelFormState<D>, 'fields'>,
    Omit<ComponentProps<'form'>, 'title' | 'onSubmit'> {
  fields: (string | Field)[];
  formOptions?: UseFormProps;
}

export const ModelForm = Object.assign(
  <D extends DataType>({
    title,
    fields,
    data,
    showActions = true,
    onCreate,
    onUpdate,
    onDelete,
    className,
    children,
    formOptions,
    ...htmlProps
  }: ModelFormProps<D>) => {
    const formProps = Object.assign(
      { mode: 'onChange', defaultValues: data },
      formOptions,
    );
    return (
      <ModelFormStoreProvider
        title={title}
        fields={fields.map(toField)}
        data={data}
        showActions={showActions}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
      >
        <FormStoreProvider {...formProps}>
          <LoadingStoreProvider>
            <Form {...htmlProps}>
              <Lenses initialLens={DataLens.INPUT}>
                {children === undefined ? (
                  <>
                    <ModelForm.Title />
                    <ModelForm.Content />
                    <ModelForm.Actions />
                    <ModelForm.Fallback />
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
    Title: ModelFormTitle,
  },
);

interface FormProps extends Omit<ComponentProps<'form'>, 'title'> {}

const Form = ({ children, ...htmlProps }: FormProps) => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const onCreate = useModelFormStore((state) => state.onCreate);
  const onUpdate = useModelFormStore((state) => state.onUpdate);
  const onSave = onCreate ?? onUpdate;
  const onSubmit = (formData: DataType) => {
    onSave && setIsLoading(true);
    onSave?.({ data: formData, dirtyFields })?.finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...htmlProps}>
      {children}
    </form>
  );
};
