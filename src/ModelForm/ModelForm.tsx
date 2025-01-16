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
import { ActionStoreProvider, type ActionState } from '@/Actions/ActionContext';

export interface ModelFormProps<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
> extends ModelFormState<D, F, FT>,
    Omit<ComponentProps<'form'>, 'onSubmit'>,
    Partial<Omit<UseFormProps, 'deafultValues' | 'values'>> {
  actionOptions?: ActionState<DT>;
}

export const ModelForm = Object.assign(
  <D extends DataType, F extends string, DT extends D, FT extends F>({
    data,
    id = data?.id || useId(),
    actionOptions,
    model,
    fields,
    fieldOptions,
    initialLens,
    resolver,
    mode = 'onSubmit',
    reValidateMode = 'onSubmit',
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
  }: ModelFormProps<D, F, DT, FT>) => {
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
        model={model}
        fields={fields}
        fieldOptions={fieldOptions}
        data={data}
        initialLens={initialLens}
      >
        <ActionStoreProvider {...actionOptions}>
          <form
            id={id}
            className={cn('space-y-4', className)}
            onSubmit={(e) => e.preventDefault()}
            {...formProps}
          >
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
        </ActionStoreProvider>
      </ModelFormStoreProvider>
    );
  },
  {
    Actions: ModelFormActions,
    Content: ModelFormContent,
    Field: ModelFormField,
  },
);
