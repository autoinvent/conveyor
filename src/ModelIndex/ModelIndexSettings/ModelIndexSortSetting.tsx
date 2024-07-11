import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/lib/components/ui/card';
import { useState } from 'react';
import { useModelIndexStore } from '../useModelIndexStore';
import { DndContext,   type DragOverEvent,   DragOverlay,   type DragStartEvent,   KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,type UniqueIdentifier } from '@dnd-kit/core';

  import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

  import { type DragEndEvent } from '@dnd-kit/core';
  import { SortableContainer } from './Sort/SortableContainer';
  import { arrayMove } from '@dnd-kit/sortable';

export interface SortedItems {
  sorted: UniqueIdentifier[];
  nonSorted: UniqueIdentifier[];
}


export const ModelIndexSortSetting = () => {

  // add changes not saved until hit button 

  const sort = useModelIndexStore(state => state.tableView?.sort) // sort to be passed to magiql endpoint
  const fields = useModelIndexStore(state => state.fields);

  const sortedNames = fields.filter(field => field.sortable).map(item => item.name); // get names of all fields (unique identifiers)
  const nonSortedNames = fields.filter(field => !field.sortable).map(item => item.name);
  // const [items, setItems] = useState<SortedItems>({ sorted: sortedNames, nonSorted: nonSortedNames})


  const [sorted, setSorted] = useState<UniqueIdentifier[]>(sortedNames);
  const [nonSorted, setNonSorted] = useState<UniqueIdentifier[]>(nonSortedNames);
  // const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null);
  const [overContainer, setOverContainer] = useState<"sorted" | "unsorted" | null>(null)

  const [isDragging, setIsDragging] = useState<boolean>(false);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardDescription>Sorting order applied:</CardDescription>
        <CardDescription>Sorted in order from top to bottom.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
        >
            <SortableContainer items={sorted} id="sorted">
        Sorted Container
      </SortableContainer>
      <SortableContainer items={nonSorted} id="nonSorted">
        Non-Sorted Container
      </SortableContainer>
      {/* <DragOverlay /> */}
        </DndContext>
      </CardContent>
      <CardFooter>
        <Button>Apply Sort</Button>
        <Button variant="outline">Clear Sort</Button>
        <Button variant="outline">Reset Sort</Button>
      </CardFooter>
    </Card>
  );

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
  }

  function handleDragOver(event: DragOverEvent) {

    // get current container 
    // see if over is in different container 
    const {active, over } = event;
    const activeContainer = active.data.current?.sortable.containerId;
    setOverContainer(over?.data.current?.sortable.containerId);
    const isDifferentContainer = activeContainer !== overContainer;
    console.log(isDifferentContainer);
  }


  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    const { active, over } = event;
    const { id: activeId } = active;
    const overId = over?.id; 
    const activeContainer = active.data.current?.sortable.containerId;
    console.log(active.data.current?.sortable.index);
    // setActiveItem(activeId);
    if (activeId !== overId) {
      if (activeContainer !== overContainer && overId) {
        // if the two containers are not the same one, move item from active to over
        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over?.data.current?.sortable.index;

        if (activeContainer === 'sorted') {

          setSorted(sorted.toSpliced(activeIndex, 1)); // delete from sorted
          setNonSorted(nonSorted.toSpliced(overIndex + 1, 0, activeId)) // add to unsorted

        } else if (activeContainer === 'nonSorted') {
          setNonSorted(nonSorted.toSpliced(activeIndex, 1)); // delete from nonSorted
          setSorted(sorted.toSpliced(overIndex + 1, 0, activeId)) // add to sorted

        }
      }
        if (activeContainer === 'sorted') {
          // Moving to sorted container
          setSorted((items) => {
            const oldIndex = items.findIndex(item => item === activeId);
            const newIndex = items.findIndex(item => item === overId) // Move to end
            return arrayMove(items, oldIndex, newIndex);
          });
        } else if (activeContainer === 'nonSorted') {
          // Moving to non-sorted container
          setNonSorted((items) => {
            const oldIndex = items.findIndex(item => item  === activeId);
            const newIndex = items.findIndex(item => item === overId) // Move to end
            return arrayMove(items, oldIndex, newIndex);
          });
        }




    }

    }

  
};