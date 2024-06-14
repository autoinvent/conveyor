import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataType, Field } from '@/types';
import { toField } from '@/utils';

import { ModelFormActions } from './ModelFormActions';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormField } from './ModelFormField';
import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';
import { ModelFormTitle } from './ModelFormTitle';

export interface ModelFormProps<D extends DataType>
  extends Omit<ModelFormState<D>, 'fields'>,
    Omit<ComponentProps<'form'>, 'title'> {
  fields: (string | Field)[];
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
    ...htmlProps
  }: ModelFormProps<D>) => {
    return (
      <form className={twMerge('', className)} {...htmlProps}>
        <ModelFormStoreProvider
          title={title}
          fields={fields.map(toField)}
          data={data}
          showActions={showActions}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        >
          {children === undefined ? (
            <>
              <ModelForm.Title />
              <ModelForm.Content />
            </>
          ) : (
            children
          )}
        </ModelFormStoreProvider>
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
