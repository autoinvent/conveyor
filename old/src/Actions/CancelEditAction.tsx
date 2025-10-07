import type { ComponentProps } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { Action } from './ActionContext';
import { useActionStore } from './useActionStore';
import { useGetActionParams } from './useGetActionParams';

export interface CancelEditActionProps extends ComponentProps<typeof Button> {}

export const CancelEditAction = ({
  size,
  variant = size === 'icon' ? 'ghost' : 'outline',
  children = size === 'icon' ? <X className="h-4 w-4" /> : 'Cancel',
  ...buttonProps
}: CancelEditActionProps) => {
  const getActionParams = useGetActionParams();
  const onCancelEdit = useActionStore(
    (state) => state.actions?.[Action.CANCEL_EDIT],
  );
  const cancelEditProps = useActionStore(
    (state) => state.actionProps?.[Action.CANCEL_EDIT],
  );
  const onCancelEditHandler = () => {
    const actionParams = getActionParams({});
    if (onCancelEdit) {
      return onCancelEdit?.(actionParams);
    }
    return actionParams.onCancelEdit();
  };

  return (
    onCancelEdit !== null && (
      <Button
        variant={variant}
        size={size}
        onClick={onCancelEditHandler}
        onKeyUp={(e) => e.key === 'Enter' && onCancelEditHandler()}
        {...cancelEditProps}
        {...buttonProps}
      >
        {cancelEditProps?.children ?? children}
      </Button>
    )
  );
};
