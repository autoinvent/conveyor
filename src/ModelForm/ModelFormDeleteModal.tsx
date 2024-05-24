import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { LuX } from 'react-icons/lu';
import * as Dialog from '@radix-ui/react-dialog';

import type { ID, CheckDeleteResult } from '@/types';

export interface ModelFormDeleteModalProps extends ComponentProps<'div'> {
  id: ID;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleteResults: CheckDeleteResult;
  onConfirmDelete: (id: ID) => void;
}

export const ModelFormDeleteModal = ({
  id,
  open,
  onOpenChange,
  deleteResults,
  onConfirmDelete,
  className,
  ...props
}: ModelFormDeleteModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={twMerge(
            'bg-[--bg-color] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            className,
          )}
          {...props}
        >
          <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
            Delete{' '}
          </Dialog.Title>
          {deleteResults?.affected?.length ? (
            <div>
              <span>The following models will be affected:</span>
              <ul>
                {deleteResults.affected.map((res, index) => {
                  return <li key={index}>{res.value}</li>;
                })}
              </ul>
            </div>
          ) : null}
          {deleteResults?.deleted?.length ? (
            <div>
              <span>The following models will be deleted as well</span>
              <ul>
                {deleteResults.deleted.map((res, index) => {
                  return <li key={index}>{res.value}</li>;
                })}
              </ul>
            </div>
          ) : null}
          {deleteResults?.prevented?.length ? (
            <div>
              <span>Cannot be deleted due to the following relationships:</span>
              <ul>
                {deleteResults.prevented.map((res, index) => {
                  return <li key={index}>{res.value}</li>;
                })}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Dialog.Close onClick={() => onConfirmDelete(id)}>
              Delete
            </Dialog.Close>
            <Dialog.Close>Cancel</Dialog.Close>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 border-none disabled:pointer-events-none data-[state=open]:[--bg-accent]">
            <LuX className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
