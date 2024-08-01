import type { CSSProperties, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot, Slottable } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export interface DndSortableWrapperProps {
  draggable: boolean;
  dndId: string;
  children?: ReactNode;
}

export const DndSortableWrapper = ({
  draggable,
  dndId,
  children,
}: DndSortableWrapperProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: dndId,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };
  return draggable ? (
    <Slot
      className={cn(isDragging && 'z-10 opacity-80')}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Slottable>{children}</Slottable>
    </Slot>
  ) : (
    children
  );
};
