import {
  type CollisionDescriptor,
  type CollisionDetection,
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

const customCollisionAlgorithm: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
}) => {
  const collisions: CollisionDescriptor[] = [];

  for (let i = 0; i < droppableContainers.length; i++) {
    const { id } = droppableContainers[i];
    const rect = droppableRects.get(id);

    if (!rect) continue;

    const collision: CollisionDescriptor = {
      id,
      data: {
        droppableContainer: droppableContainers[i],
        value: Math.abs(rect.left - collisionRect.left),
      },
    };

    // edge case: when first is smaller than half the width of the dragged column,
    // the collision must happen if the dragged column enters the first or last.
    // Without this, the dragged column will never be considered "over" the smaller column.
    if (i === 0 && collisionRect.width > rect.width / 2) {
      const isOverLeftEdge = collisionRect.left < rect.left + rect.width * 0.5;
      const isOverRightEdge =
        collisionRect.right > rect.right - rect.width * 0.5;

      if (isOverLeftEdge || isOverRightEdge) {
        collisions.push(collision);
      }
    } else {
      collisions.push(collision);
    }
  }
  return collisions.sort((a, b) => a.data.value - b.data.value);
};

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
  );
  const handleDragEnd = ({ active, over, collisions, delta }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      const oldIndex = dndList.indexOf(active.id.toString());
      const newIndex = dndList.indexOf(over.id.toString());
      onDnDListChange?.(arrayMove(dndList, oldIndex, newIndex));
    }
  };

  return draggable ? (
    <DndContext
      collisionDetection={customCollisionAlgorithm}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  ) : (
    children
  );
};
