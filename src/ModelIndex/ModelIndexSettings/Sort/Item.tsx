import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import type React from 'react';
import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { dragHandleStyle, itemStyle, spanStyle } from './SortableItem';
interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}
// item to be dragged by DragOverlay (purely visual component)

const Item: ForwardRefRenderFunction<HTMLLIElement, ItemProps> = (
  { children, ...props },
  ref,
) => {
  return (
    <li {...props} ref={ref} className={itemStyle}>
      <span className={spanStyle}>
        <DragHandleDots2Icon className={dragHandleStyle} />
        <p>{children}</p>
      </span>
    </li>
  );
};

export default forwardRef(Item);
