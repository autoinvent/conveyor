import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/lib/components/ui/card";
import { SyntheticEvent, useState } from "react";
import { useModelIndexStore } from "../useModelIndexStore";
import {
  DndContext,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContainer } from "./Sort/SortableContainer";
import { arrayMove } from "@dnd-kit/sortable";
import Item from "./Sort/Item";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import type { Field } from "@/types";

import { getSortedAndNonSortedFields } from "../utils";
export interface SortedItems {
  sorted: UniqueIdentifier[];
  nonSorted: UniqueIdentifier[];
}

export const ModelIndexSortSetting = () => {
  // add changes not saved until hit button

  const onTableViewChange = useModelIndexStore(
    (state) => state.onTableViewChange,
  );
  const sort = useModelIndexStore((state) => state.tableView?.sort); // sort to be passed to magiql endpoint
  const fields = useModelIndexStore((state) => state.fields);


  const sortedFields = fields.filter((field) => field.sortable);
  
  const dividedFields = getSortedAndNonSortedFields(sortedFields, sort);

  const [sorted, setSorted] = useState<Field[]>(dividedFields.sorted);
  const [nonSorted, setNonSorted] =
    useState<Field[]>(dividedFields.nonSorted);
  const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null);
  const [overContainer, setOverContainer] = useState<
    "sorted" | "unsorted" | null
  >(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleApplySort = () => {

     // TODO: feed this array of sorts 
    onTableViewChange && onTableViewChange({sort: sorted})
    

  }

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
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContainer items={sorted} id="sorted">
            SORTED
          </SortableContainer>
          <SortableContainer items={nonSorted} id="nonSorted">
            NON-SORTED
          </SortableContainer>
          {createPortal(
            <DragOverlay
              wrapperElement="ul"
            >
              {isDragging && activeItem ? <Item>{activeItem}</Item> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </CardContent>
      <CardFooter>
        <Button onClick={handleApplySort}>Apply Sort</Button>
        <Button variant="outline">Clear Sort</Button>
        <Button variant="outline">Reset Sort</Button>
      </CardFooter>
    </Card>
  );

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
    setActiveItem(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    // get current container
    // see if over is in different container
    const { over } = event;
    isDragging && setOverContainer(over?.data.current?.sortable.containerId);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    // active is item being dragged
    // over is the destination
    setIsDragging(false);
    setActiveItem(null);
    const { id: activeId } = active;
    const overId = over?.id;
    const activeContainer = active.data.current?.sortable.containerId;
    if (activeId !== overId && overId) {
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      if (activeContainer !== overContainer) {
        // if the two containers are not the same one, move item to other container
        if (activeContainer === "sorted") {
          const toMove = sorted[activeIndex];
          setSorted(sorted.toSpliced(activeIndex, 1)); // delete from sorted
          setNonSorted(nonSorted.toSpliced(overIndex ?? 0, 0, toMove)); // add to unsorted
        } else if (activeContainer === "nonSorted") {
          const toMove = nonSorted[activeIndex];
          setNonSorted(nonSorted => nonSorted.toSpliced(activeIndex, 1));
          setSorted(sorted => sorted.toSpliced(overIndex ?? 0, 0, toMove));

        }
      } else if (activeContainer === "sorted") {
        // Moving items within the sorted container only
        setSorted((items) => {
          return arrayMove(items, activeIndex, overIndex);
        });
      } else if (activeContainer === "nonSorted") {
        // Moving items within the nonSorted container only
        setNonSorted((items) => {
          return arrayMove(items, activeIndex, overIndex);
        });
      }
    }
  }

};
