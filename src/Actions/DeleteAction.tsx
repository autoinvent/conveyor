import type { ComponentProps } from 'react';

import { Trash2 } from 'lucide-react';

import { useFormStore } from '@/Form';
import { Button } from '@/lib/components/ui/button';

import { Action } from './ActionContext';
import { useActionStore } from './useActionStore';
import { useGetActionParams } from './useGetActionParams';

export interface DeleteActionProps extends ComponentProps<typeof Button> {}

export const DeleteAction = ({
  size,
  variant = size === 'icon' ? 'ghost-destructive' : 'destructive',
  children = size === 'icon' ? <Trash2 className="h-4 w-4" /> : 'Delete',
  ...buttonProps
}: DeleteActionProps) => {
  const getActionParams = useGetActionParams();
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onDelete = useActionStore((state) => state.actions?.[Action.DELETE]);
  const deleteProps = useActionStore(
    (state) => state.actionProps?.[Action.DELETE],
  );

  const onDeleteHandler = handleSubmit(async () => {
    await onDelete?.(getActionParams({}));
  });

  return (
    onDelete != null && (
      <Button
        variant={variant}
        size={size}
        onClick={onDeleteHandler}
        onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
        {...deleteProps}
        {...buttonProps}
      >
        {deleteProps?.children ?? children}
      </Button>
    )
  );
};
