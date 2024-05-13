import { ComponentProps, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { DataType } from '@/Data';
import { Lenses, DataLens } from '@/Lenses';
import { useDependencyStore, useIsFirstRender } from '@/hooks';
import { toField } from '@/utils';

import { ModelFormStore, ModelFormStoreContext } from './ModelFormStoreContext';
import { ModelFormTitle } from './ModelFormTitle';
import { ModelFormContent } from './ModelFormContent';
import { ModelFormCreateCrud } from './ModelFormCreateCrud';
import { ModelFormDetailCrud } from './ModelFormDetailCrud';

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
    type,
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
      type,
    });

    const methods = useForm({ mode: 'onChange', defaultValues });

    const onSubmitHandler = (formData: DataType) => {
      onSubmit?.({
        data: formData,
        dirtyFields: methods.formState.dirtyFields,
      });
    };
    let CrudComponent = null;
    switch (type) {
      case 'create':
        CrudComponent = <ModelFormCreateCrud />;
      case 'detail':
        CrudComponent = <ModelFormDetailCrud />;
    }

    const isFirstRender = useIsFirstRender();
    useEffect(() => {
      if (!isFirstRender.current) {
        methods.reset(defaultValues)
      }
    }, [defaultValues])

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
                  {CrudComponent}
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
    CreateCrud: ModelFormCreateCrud,
    DetailCrud: ModelFormDetailCrud,
    Title: ModelFormTitle,
  },
);
