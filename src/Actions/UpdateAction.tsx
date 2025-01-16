import type { ComponentProps } from 'react';

import { Save } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import { useFormStore } from '@/Form';
import type { DataType } from '@/types';

import { useActionStore } from './useActionStore';
import { Action } from './ActionContext';
import { useGetActionParams } from './useGetActionParams';

export interface UpdateActionProps extends ComponentProps<typeof Button> {}

export const UpdateAction = ({
  children = <Save className="h-4 w-4" />,
  ...buttonProps
}: UpdateActionProps) => {
  const getActionParams = useGetActionParams();
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onUpdate = useActionStore((state) => state[Action.UPDATE]);

  const onUpdateHandler = handleSubmit(async (formData: DataType) => {
    await onUpdate?.(getActionParams(formData));
  });

  return (
    onUpdate && (
      <Button
        variant="ghost-success"
        size="icon"
        onClick={onUpdateHandler}
        onKeyUp={(e) => e.key === 'Enter' && onUpdateHandler()}
        {...buttonProps}
      />
    )
  );
};
