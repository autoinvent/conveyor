import type { ComponentProps } from 'react';
import type { UseFormProps } from 'react-hook-form';

import { Lenses } from '@/Lenses';
import { LoadingStoreProvider } from '@/Loading';
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
import { FormStoreProvider } from '..';

export interface ModelFormProps<D extends DataType>
  extends Omit<ModelFormState<D>, 'fields'>,
    Omit<ComponentProps<'form'>, 'title'> {
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
      <form className={className} {...htmlProps}>
        <LoadingStoreProvider>
          <Lenses initialLens={DataLens.VALUE}>
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
                {children === undefined ? (
                  <>
                    <ModelForm.Title />
                    <ModelForm.Content />
                  </>
                ) : (
                  children
                )}
              </FormStoreProvider>
            </ModelFormStoreProvider>
          </Lenses>
        </LoadingStoreProvider>
      </form>
    );
  },
  {
    Actions: ModelFormActions,
    Content: ModelFormContent,
    Field: ModelFormField,
    Title: ModelFormTitle,
  },
);
