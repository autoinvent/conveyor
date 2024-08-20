import { useId, type ComponentProps } from 'react';
import { useForm, type UseFormProps } from 'react-hook-form';

import { FormStoreProvider } from '@/Form';
import { Lenses } from '@/Lenses';
import type { DataType } from '@/types';
import { cn } from '@/lib/utils';

import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormField } from './ModelFormField';
import { ModelFormActions } from './ModelFormActions';

export interface ModelFormProps<
  D extends DataType,
  F extends string,
  T extends F,
> extends ModelFormState<D, F, T>,
    Omit<ComponentProps<'form'>, 'onSubmit'>,
    Partial<Omit<UseFormProps, 'deafultValues' | 'values'>> {}

export const ModelForm = Object.assign(
  <D extends DataType, F extends string, T extends F>({
    data,
    id = data?.id || useId(),
    fields,
    fieldOrder,
    fieldOptions,
    onCreate,
    onDelete,
    onUpdate,
    readOnly,
    initialLens,
    resolver,
    mode = 'onChange',
    reValidateMode,
    errors,
    resetOptions,
    criteriaMode = 'all',
    shouldFocusError,
    delayError,
    shouldUseNativeValidation,
    shouldUnregister,
    children,
    className,
    ...formProps
  }: ModelFormProps<D, F, T>) => {
    const formMethods = useForm({
      values: data,
      mode,
      reValidateMode,
      errors,
      resetOptions,
      criteriaMode,
      shouldFocusError,
      delayError,
      shouldUseNativeValidation,
      shouldUnregister,
    });
    return (
      <ModelFormStoreProvider
        fields={fields}
        fieldOrder={fieldOrder}
        fieldOptions={fieldOptions}
        data={data}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
        readOnly={readOnly}
        initialLens={initialLens}
      >
        <form id={id} className={cn('space-y-4', className)} {...formProps}>
          <Lenses initialLens={initialLens}>
            <FormStoreProvider id={id} {...formMethods}>
              {children === undefined ? (
                <>
                  <ModelFormContent />
                  <ModelFormActions />
                </>
              ) : (
                children
              )}
            </FormStoreProvider>
          </Lenses>
        </form>
      </ModelFormStoreProvider>
    );
  },
  {
    Actions: ModelFormActions,
    Content: ModelFormContent,
    Field: ModelFormField,
  },
);
