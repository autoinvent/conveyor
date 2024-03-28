import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { DataContext, Data } from './DataContext';

export const useData = () => {
  const data = useContext(DataContext);
  const formMethods = useFormContext();
  const onSaveHandler = (onSave: Function | undefined) => {
    return formMethods.handleSubmit((formValues) => {
      const dirtyFields = { ...formMethods.formState.dirtyFields };
      Object.keys(dirtyFields).forEach((dirtyField) => {
        dirtyFields[dirtyField] = formValues[dirtyField];
      });
      onSave?.(dirtyFields);
    });
  };
  const errors = formMethods.formState.errors;
  return { data, errors, onSaveHandler, formMethods };
};
