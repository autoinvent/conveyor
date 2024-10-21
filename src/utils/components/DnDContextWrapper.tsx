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
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
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
      const oldIndex = dndList.indexOf(active.id.toString());
      const newIndex = dndList.indexOf(over.id.toString());
      onDnDListChange?.(arrayMove(dndList, oldIndex, newIndex));
    }
  };

  return draggable ? (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  ) : (
    children
  );
};
