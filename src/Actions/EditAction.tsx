import type { ComponentProps } from 'react';

import { SquarePen } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { useActionStore } from './useActionStore';
import { Action } from './ActionContext';
import { useGetActionParams } from './useGetActionParams';

export interface EditActionProps extends ComponentProps<typeof Button> {}

export const EditAction = ({
  size,
  variant = size === 'icon' ? 'ghost' : 'default',
  children = size === 'icon' ? <SquarePen className="h-4 w-4" /> : 'Edit',
  ...buttonProps
}: EditActionProps) => {
  const onEditProp = useActionStore((state) => state.actions?.[Action.EDIT]);
  const getActionParams = useGetActionParams();
  const { onEdit } = getActionParams({});
  const onEditHandler = onEditProp === undefined ? onEdit : onEditProp;

  return (
    onEditHandler && (
      <Button
        variant={variant}
        size={size}
        onClick={onEdit}
        onKeyUp={(e) => e.key === 'Enter' && onEdit()}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  );
};
