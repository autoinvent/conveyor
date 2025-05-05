import type { ComponentProps } from 'react';

import { SquarePen } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { Action } from './ActionContext';
import { useActionStore } from './useActionStore';
import { useGetActionParams } from './useGetActionParams';

export interface EditActionProps extends ComponentProps<typeof Button> {}

export const EditAction = ({
  size,
  variant = size === 'icon' ? 'ghost' : 'default',
  children = size === 'icon' ? <SquarePen className="h-4 w-4" /> : 'Edit',
  ...buttonProps
}: EditActionProps) => {
  const getActionParams = useGetActionParams();
  const onEdit = useActionStore((state) => state.actions?.[Action.EDIT]);
  const editProps = useActionStore((state) => state.actionProps?.[Action.EDIT]);

  const onEditHandler = () => {
    const actionParams = getActionParams({});
    if (onEdit) {
      return onEdit?.(actionParams);
    }
    return actionParams.onEdit();
  };

  return (
    onEdit !== null && (
      <Button
        variant={variant}
        size={size}
        onClick={onEditHandler}
        onKeyUp={(e) => e.key === 'Enter' && onEditHandler()}
        {...editProps}
        {...buttonProps}
      >
        {editProps?.children ?? children}
      </Button>
    )
  );
};
