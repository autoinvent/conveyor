import type { ComponentProps } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useModelIndexStore } from './useModelIndexStore';

export const ModelIndexCreateButton = (
  props: Omit<ComponentProps<'button'>, 'onClick'>,
) => {
  const onCreate = useModelIndexStore((state) => state.onCreate);
  return (
    onCreate && (
      <button
        className="h-8 w-8 rounded-md border-[--success] bg-[--success] px-2 py-1 text-sm hover:border-[--success-dark] hover:bg-[--success-dark]"
        onClick={() => onCreate?.()}
        {...props}
      >
        <FaPlus />
      </button>
    )
  );
};
