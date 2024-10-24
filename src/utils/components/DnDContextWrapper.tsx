import type { ReactNode } from 'react';

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  CollisionDescriptor,
  CollisionDetection,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';

/**
 * Sort collisions from greatest to smallest value
 */
export function sortCollisionsDesc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return b - a;
}

const customCollisionAlgorithm: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
  active,
  ...rest
}) => {
  const draggableWidth = active.rect.current.translated?.width ?? 0;

  const collisions = rectIntersection({
    collisionRect,
    droppableRects,
    droppableContainers,
    active,
    ...rest,
  });

  const sortedCollisions = collisions.sort((a, b) => {
    // compute percentage of `a` and `b`, which is the proportion of the droppable component that is covered by the draggable component.
    const shadowCastedOnA = a.data?.value * draggableWidth;
    const shadowCastedOnB = b.data?.value * draggableWidth;

    const percentA = Math.min(
      shadowCastedOnA / a.data?.droppableContainer.rect.current.width,
      1,
    );
    const percentB = Math.min(
      shadowCastedOnB / b.data?.droppableContainer.rect.current.width,
      1,
    );

    if (percentB === percentA) {
      return -1;
    }

    return percentB - percentA;
  });

  return sortedCollisions;
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
    useSensor(KeyboardSensor, {}),
  );

  const handleDragOver = ({ active, over }: DragOverEvent) => {
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
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      {children}
    </DndContext>
  ) : (
    children
  );
};
