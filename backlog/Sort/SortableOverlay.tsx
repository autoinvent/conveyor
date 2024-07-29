import {
  DragOverlay,
  type DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import type { PropsWithChildren, ReactNode } from 'react';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

interface Props {
  children: ReactNode;
}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  );
}
