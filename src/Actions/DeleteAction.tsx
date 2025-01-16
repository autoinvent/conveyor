import type { ComponentProps } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import { useFormStore } from '@/Form';

import { useActionStore } from './useActionStore';
import { Action } from './ActionContext';
import { useGetActionParams } from './useGetActionParams';

export interface UpdateActionProps extends ComponentProps<typeof Button> {}

export const DeleteAction = ({
  children = <Trash2 className="h-4 w-4" />,
  ...buttonProps
}: UpdateActionProps) => {
  const getActionParams = useGetActionParams();
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onDelete = useActionStore((state) => state.actions?.[Action.DELETE]);

  const onDeleteHandler = handleSubmit(async () => {
    await onDelete?.(getActionParams({}));
  });

  return (
    onDelete && (
      <Button
        variant="ghost-destructive"
        size="icon"
        onClick={onDeleteHandler}
        onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
        {...buttonProps}
      />
    )
  );
};
