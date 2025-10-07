import type { ComponentProps } from 'react';

import { Save } from 'lucide-react';

import { useFormStore } from '@/Form';
import { Button } from '@/lib/components/ui/button';
import type { DataType } from '@/types';

import { Action } from './ActionContext';
import { useActionStore } from './useActionStore';
import { useGetActionParams } from './useGetActionParams';

export interface SubmitActionProps extends ComponentProps<typeof Button> {}

export const SubmitAction = ({
  size,
  variant = size === 'icon' ? 'ghost-success' : 'default',
  children = size === 'icon' ? <Save className="h-4 w-4" /> : 'Save',
  ...buttonProps
}: SubmitActionProps) => {
  const getActionParams = useGetActionParams();
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onSubmit = useActionStore((state) => state.actions?.[Action.SUBMIT]);
  const updateProps = useActionStore(
    (state) => state.actionProps?.[Action.SUBMIT],
  );

  const onSubmitHandler = handleSubmit(async (formData: DataType) => {
    await onSubmit?.(getActionParams(formData));
  });

  return (
    onSubmit !== null && (
      <Button
        variant={variant}
        size={size}
        onClick={onSubmitHandler}
        onKeyUp={(e) => e.key === 'Enter' && onSubmitHandler()}
        {...updateProps}
        {...buttonProps}
      >
        {updateProps?.children ?? children}
      </Button>
    )
  );
};
