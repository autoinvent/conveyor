import type React from 'react';
import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { itemStyle } from './SortableItem';

interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}
// item to be dragged by DragOverlay (purely visual)

const Item: ForwardRefRenderFunction<HTMLLIElement, ItemProps> = (
  { children, ...props },
  ref
) => {
  return (
    <li {...props} ref={ref} className={itemStyle}>
      {children}
    </li>
  );
};

export default forwardRef(Item);