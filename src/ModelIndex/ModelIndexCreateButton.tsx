import { ComponentProps } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useModelIndex } from './useModelIndex';

export const ModelIndexCreateButton = (
  props: Omit<ComponentProps<'button'>, 'onClick'>,
) => {
  const { selected: onCreate } = useModelIndex((state) => state.onCreate);
  return (
    <button className='bg-[--success] border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark] rounded-md' onClick={() => onCreate?.()} {...props}>
      <FaPlus />
    </button>
  );
};
