import type { ComponentProps } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/lib/components/ui/button';

import { useModelIndexStore } from './useModelIndexStore';

export const ModelIndexCreateButton = ({
  onClick,
  ...buttonProps
}: ComponentProps<typeof Button>) => {
  const onCreate = useModelIndexStore((state) => state.onCreate);
  return (
    onCreate && (
      <Button
        variant="outline-success"
        size="icon"
        onClick={onClick ?? (() => onCreate?.())}
        {...buttonProps}
      >
        <Plus />
      </Button>
    )
  );
};
