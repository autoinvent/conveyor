import { ComponentProps } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useModelIndex } from './useModelIndex';

export const ModelIndexCreateButton = (
  props: Omit<ComponentProps<'button'>, 'onClick'>,
) => {
  const { selected: onCreate } = useModelIndex((state) => state.onCreate);
  return (
    <button className='rounded-md' onClick={() => onCreate?.()} {...props}>
      <FaPlus />
    </button>
  );
};
