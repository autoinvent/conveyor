import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner, useLoadingStore } from '@/Loading';
import { DataLens } from '@/types';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormActionsProps extends ComponentProps<'div'> {}

export const ModelFormActions = ({ className }: ModelFormActionsProps) => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const defaultValues = useFormStore((state) => state.formState.defaultValues);
  const reset = useFormStore((state) => state.reset);
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelFormStore((state) => state.showActions);
  const onCreate = useModelFormStore((state) => state.onCreate);
  const onUpdate = useModelFormStore((state) => state.onUpdate);
  const onDelete = useModelFormStore((state) => state.onDelete);
  const data = useModelFormStore((state) => state.data);
  const fields = useModelFormStore((state) => state.fields);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onDeleteHandler = () => {
    onDelete && setIsLoading(true);
    onDelete?.(defaultValues)?.finally(() => {
      setIsLoading(false);
    });
  };

  return (
    showActions &&
    fields.length > 0 &&
    data && (
      <div className={twMerge('flex justify-center', className)}>
        <Lens lens={!isLoading && DataLens.VALUE}>
          <button
            type="button"
            className=" flex h-full items-center justify-center rounded-l-sm border border-[--primary] px-2 py-1 text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
            onClick={onEdit}
            onKeyUp={(e) => e.key === 'Enter' && onEdit()}
          >
            Edit
          </button>
          {!onCreate && onDelete && (
            <button
              onClick={onDeleteHandler}
              onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
              type="button"
              className="flex h-full items-center justify-center rounded-r-sm border border-[--danger] px-2 py-1 text-[--danger] focus:bg-[--danger] hover:bg-[--danger] focus:text-[--text-color] hover:text-[--text-color]"
            >
              Delete
            </button>
          )}
        </Lens>
        <Lens lens={!isLoading && DataLens.INPUT}>
          {onUpdate && (
            <button
              className="flex h-full items-center justify-center rounded-l-sm border border-[--success] px-2 py-1 text-[--success] focus:bg-[--success] hover:bg-[--success] focus:text-[--text-color] hover:text-[--text-color]"
              type="submit"
            >
              {onCreate ? 'Create' : 'Save'}
            </button>
          )}
          <button
            type="button"
            className="flex h-full items-center justify-center rounded-r-sm border border-[--primary] px-2 py-1 text-[--primary] focus:bg-[--primary] hover:bg-[--primary] focus:text-[--text-color] hover:text-[--text-color]"
            onClick={onCancelEdit}
            onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
          >
            Cancel
          </button>
        </Lens>
        {isLoading && <Spinner />}
      </div>
    )
  );
};
