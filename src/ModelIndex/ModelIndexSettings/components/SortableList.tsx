import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type React from 'react';

import type { DragEndEvent } from "@dnd-kit/core";
import { SortableItem } from './SortableItem';

interface Props {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>
}


export function SortableList({items, setItems} : Props) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => {
          return <SortableItem key={id} id={id} />;
          })}
      </SortableContext>
    </DndContext>
  );
  
  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (active.id !== over?.id) {
      
      setItems((items) => {
        const oldIndex = items.findIndex(item => item === active.id);
        const newIndex = items.findIndex(item => item === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }


}