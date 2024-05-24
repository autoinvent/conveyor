import type { ComponentProps } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useModelIndex } from './useModelIndex';

export const ModelIndexCreateButton = (
  props: Omit<ComponentProps<'button'>, 'onClick'>,
) => {
  const { selected: onCreate } = useModelIndex((state) => state.onCreate);
  return (
    <button
      className=" text-sm px-2 py-1 h-8 min-h-8 min-w-8 w-8 bg-[--success] border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark] rounded-md"
      onClick={() => onCreate?.()}
      {...props}
    >
      <FaPlus />
    </button>
  );
};
