import type { ComponentProps } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { useActionStore } from './useActionStore';
import { Action } from './ActionContext';
import { useGetActionParams } from './useGetActionParams';

export interface CancelEditActionProps extends ComponentProps<typeof Button> {}

export const CancelEditAction = ({
  children = <X className="h-4 w-4" />,
  ...buttonProps
}: CancelEditActionProps) => {
  const onCancelEditProp = useActionStore(
    (state) => state.actions?.[Action.CANCEL_EDIT],
  );
  const getActionParams = useGetActionParams();
  const { onCancelEdit } = getActionParams({});
  const onCancelEditHandler =
    onCancelEditProp === undefined ? onCancelEdit : onCancelEditProp;

  return (
    onCancelEditHandler && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onCancelEdit}
        onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
        {...buttonProps}
      />
    )
  );
};
