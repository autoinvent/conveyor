import { type ComponentProps, useId } from 'react';
import { type UseFormProps, useForm } from 'react-hook-form';

import { FormStoreProvider } from '@/Form';
import { Lenses } from '@/Lenses';
import { cn } from '@/lib/utils';
import type { DataType } from '@/types';

import { ModelFormActions } from './ModelFormActions';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormField } from './ModelFormField';
import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';

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
    fieldOptions,
    onCreate,
    onDelete,
    onUpdate,
    onEdit,
    onCancelEdit,
    readOnly,
    initialLens,
    resolver,
    mode = 'onSubmit',
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
        fieldOptions={fieldOptions}
        data={data}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onEdit={onEdit}
        onCancelEdit={onCancelEdit}
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
