import type { ComponentProps } from 'react';
import type { UseFormProps } from 'react-hook-form';

import { FormStoreProvider, useFormStore } from '@/Form';
import { Lenses, useLensesStore } from '@/Lenses';
import { LoadingStoreProvider, useLoadingStore } from '@/Loading';
import { DataLens, type DataType, type Field } from '@/types';
import { toField } from '@/utils';

import { ModelFormActions } from './ModelFormActions';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormFallback } from './ModelFormFallback';
import { ModelFormField } from './ModelFormField';
import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';
import { ModelFormTitle } from './ModelFormTitle';
import { useModelFormStore } from './useModelFormStore';

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
    onEdit,
    onCancelEdit,
    className,
    children,
    formOptions,
    ...htmlProps
  }: ModelFormProps<D>) => {
    const formProps = Object.assign(
      { mode: 'onChange', values: data },
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
        onEdit={onEdit}
        onCancelEdit={onCancelEdit}
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
  return (
    <form onSubmit={(e) => e.preventDefault()} {...htmlProps}>
      {children}
    </form>
  );
};
