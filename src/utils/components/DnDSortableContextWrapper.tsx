import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { ReactNode } from 'react';

export interface DnDSortableContextWrapperProps {
  draggable: boolean;
  dndList: string[];
  children?: ReactNode;
}

export const DnDSortableContextWrapper = ({
  draggable,
  dndList,
  children,
}: DnDSortableContextWrapperProps) => {
  return draggable ? (
    <SortableContext items={dndList} strategy={horizontalListSortingStrategy}>
      {children}
    </SortableContext>
  ) : (
    children
  );
};
