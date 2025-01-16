import type { ComponentProps, ReactNode } from 'react';

import { LoaderCircle } from 'lucide-react';

import { useFormStore } from '@/Form';
import { Lens } from '@/Lenses';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import { DataLens } from '@/types';

import { useModelFormStore } from './useModelFormStore';
import { EditAction } from '@/Actions/EditAction';
import { DeleteAction } from '@/Actions/DeleteAction';
import { CancelEditAction } from '@/Actions/CancelEditAction';
import { SubmitAction } from '@/Actions/SubmitAction';
import { useActionStore } from '@/Actions/useActionStore';

export interface ModelFormActionsProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export const ModelFormActions = ({
  className,
  children,
}: ModelFormActionsProps) => {
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);
  const fields = useModelFormStore((state) => state.fields);
  const showActions = useActionStore((state) => state.showActions);

  return (
    showActions !== false &&
    fields.length > 0 && (
      <div className={cn('space-x-4 whitespace-nowrap', className)}>
        {children === undefined ? (
          <>
            <Lens lens={!isSubmitting && DataLens.DISPLAY}>
              <EditAction />
              <DeleteAction />
            </Lens>
            <Lens lens={!isSubmitting && DataLens.INPUT}>
              <SubmitAction />
              <CancelEditAction />
            </Lens>
            {isSubmitting && (
              <Button variant="ghost" className="w-36">
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </>
        ) : (
          children
        )}
      </div>
    )
  );
};
