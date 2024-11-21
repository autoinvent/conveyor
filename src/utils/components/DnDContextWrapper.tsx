import type { ReactNode } from 'react';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';

export interface DnDContextWrapperProps {
  draggable: boolean;
  dndList: string[];
  onDnDListChange?: (newFieldOrder: string[]) => void;
  children?: ReactNode;
}
export const DnDContextWrapper = ({
  draggable,
  dndList,
  onDnDListChange,
  children,
}: DnDContextWrapperProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {}),
  );
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      const oldIndex = dndList.indexOf(active.id as string);
      const newIndex = dndList.indexOf(over.id as string);
      onDnDListChange?.(arrayMove(dndList, oldIndex, newIndex));
    }
  };

  return draggable ? (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      autoScroll={{threshold: { x: 0.2, y: 0 }}}
    >
      {children}
    </DndContext>
  ) : (
    children
  );
};
