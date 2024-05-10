import { ComponentProps, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { DataType } from '@/Data';
import { Lenses, DataLens } from '@/Lenses';
import { useDependencyStore } from '@/hooks';
import { toField } from '@/utils';

import { ModelFormStore, ModelFormStoreContext } from './ModelFormStoreContext';
import { ModelFormTitle } from './ModelFormTitle';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormCrud } from './ModelFormCrud'

export interface ModelForm
  extends ModelFormStore,
  Omit<ComponentProps<'form'>, 'onSubmit' | 'title'> {
  children?: ReactNode;
}

export const ModelForm = Object.assign(
  ({
    fields,
    defaultValues,
    title,
    onSubmit,
    onCancel,
    onOpenFieldSelect,
    initialLens = DataLens.EDITING,
    showActions = true,
    children,
    className,
    ...props
  }: ModelForm) => {
    const store = useDependencyStore<ModelFormStore>({
      fields: fields.map((field) => toField(field)),
      defaultValues,
      title,
      onSubmit,
      onCancel,
      onOpenFieldSelect,
      initialLens,
      showActions,
    });

    const methods = useForm({ mode: 'onChange', defaultValues });
    const onSubmitHandler = (formData: DataType) => {
      onSubmit?.({
        data: formData,
        dirtyFields: methods.formState.dirtyFields,
      });
    };
    return (
      <ModelFormStoreContext.Provider value={store}>
        <Lenses initialLens={initialLens}>
          <FormProvider {...methods}>
            <form
              className={twMerge('whitespace-nowrap', className)}
              {...props}
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              {children === undefined ? (
                <>
                  <ModelFormTitle />
                  <ModelFormContent />
                  <ModelFormCrud />
                </>
              ) : (
                children
              )}
            </form>
          </FormProvider>
        </Lenses>
      </ModelFormStoreContext.Provider>
    );
  },
  {
    Content: ModelFormContent,
    Crud: ModelFormCrud,
    Title: ModelFormTitle,
  },
);
