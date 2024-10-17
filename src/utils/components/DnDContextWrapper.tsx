import {
  type Collision,
  CollisionDescriptor,
  type CollisionDetection,
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  rectIntersection,
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
  active,
  ...rest
}) => {
  const draggableWidth = active.rect.current.translated?.width ?? 0;
  const x = rectIntersection({
    collisionRect,
    droppableRects,
    droppableContainers,
    active,
    ...rest,
  });

  const y = x.sort((a, b) => {
    // compute percentage of `a` and `b`, which is the proportion of the droppable component that is covered by the draggable component.
    console.log(a);
    console.log(b);

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

  return y;
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
