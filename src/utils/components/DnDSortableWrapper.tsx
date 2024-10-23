import type { CSSProperties, ReactNode } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export interface DndSortableWrapperProps {
  draggable: boolean;
  dndId: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const DndSortableWrapper = ({
  draggable,
  dndId,
  disabled = false,
  children,
}: DndSortableWrapperProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: dndId,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };
  const draggableProps = disabled
    ? {}
    : {
        ...attributes,
        ...listeners,
      };
  return draggable ? (
    <Slot
      className={cn(isDragging && 'z-10 opacity-80')}
      ref={setNodeRef}
      style={style}
      {...draggableProps}
    >
      {children}
    </Slot>
  ) : (
    children
  );
};
