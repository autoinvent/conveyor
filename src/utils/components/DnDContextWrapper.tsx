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

function sortCollisionsAsc(_ref: any, _ref2: any) {
  const {
    data: { value: a },
  } = _ref;
  const {
    data: { value: b },
  } = _ref2;
  return a - b;
}

function centerOfRectangle(rect: any) {
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.5,
  };
}

function distanceBetween(p1: any, p2: any) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

const customCollisionAlgorithm: CollisionDetection = (_ref) => {
  const { collisionRect, droppableRects, droppableContainers } = _ref;
  const centerRect = centerOfRectangle(collisionRect);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween,
        },
      });
    }
  }
  console.log(collisions.sort(sortCollisionsAsc))
  return collisions.sort(sortCollisionsAsc);
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
