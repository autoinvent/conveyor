import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/lib/components/ui/card";
import { useState } from "react";
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

import { changeToNoneDirection, getSortedAndNonSortedFields } from "../utils";
export interface SortedItems {
  sorted: UniqueIdentifier[];
  nonSorted: UniqueIdentifier[];
}

export const ModelIndexSortSetting = () => {
  // add changes not saved until hit button

  const onTableViewChange = useModelIndexStore(
    (state) => state.tableViewOptions.onTableViewChange,
  );
  const sortState = useModelIndexStore((state) => state.tableViewOptions.tableView?.sort); // sort to be passed to magiql endpoint
  
  const fields = useModelIndexStore((state) => state.fields);


  const sortedFields = fields.filter((field) => field.sortable !== false);
  
  const dividedFields = getSortedAndNonSortedFields(sortedFields, sortState);

  const [sort, setSort] = useState<string[] | undefined>(sortState);
  const [sorted, setSorted] = useState<Field[]>(dividedFields.sorted);
  const [nonSorted, setNonSorted] =
    useState<Field[]>(dividedFields.nonSorted);
  const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null);
  const [overContainer, setOverContainer] = useState<
    "sorted" | "unsorted" | null
  >(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver ] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleApplySort = () => {
    // set items in nonSorted category to None for their sort direction before saving!
    setSort(changeToNoneDirection(nonSorted, sort));

    if (onTableViewChange) {
      onTableViewChange({sort: sort});
    }

  };

  const handleReset = () => {
    setNonSorted((prev) => {
      console.log(prev);
      return [...prev, ...sorted]
    });
    setSorted([]);

  };

  const handleClear = () => {
    setSorted(dividedFields.sorted);
    setNonSorted(dividedFields.nonSorted);
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
          <SortableContainer items={sorted} isDragging={isDraggingOver} activeItem={activeItem} sort={sort} setSort={setSort} id="sorted">
            SORTED
          </SortableContainer>
          <SortableContainer items={nonSorted} isDragging={isDraggingOver} activeItem={activeItem} sort={sort} setSort={setSort} id="nonSorted">
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
        <Button variant="outline" onClick={handleClear}>Clear Sort</Button>
        <Button variant="destructive" onClick={handleReset}>Reset Sort</Button>
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
    if (overContainer) setIsDraggingOver(true);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    // active is item being dragged
    // over is the destination
    setIsDragging(false);
    setActiveItem(null);
    setIsDraggingOver(false);
    const { id: activeId } = active;
    const overId = over?.id;
    const activeContainer = active.data.current?.sortable.containerId;
    if (activeId !== overId && overId) {
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      if (activeContainer !== overContainer) {
        // moving items across containers
        if (activeContainer === "sorted") {
          const toMove = sorted[activeIndex];
          setSorted(sorted.toSpliced(activeIndex, 1)); // delete from sorted
          setNonSorted(nonSorted.toSpliced(overIndex ?? 0, 0, toMove)); // add to unsorted
        } else if (activeContainer === "nonSorted") {
          const toMove = nonSorted[activeIndex];
          setNonSorted(nonSorted => nonSorted.toSpliced(activeIndex, 1));
          setSorted(sorted => sorted.toSpliced(overIndex ?? 0, 0, toMove));

        }
        // else, we are moving items within their own containers.
      } else if (activeContainer === "sorted") {
        setSorted((items) => {
          return arrayMove(items, activeIndex, overIndex);
        });
      } else if (activeContainer === "nonSorted") {
        setNonSorted((items) => {
          return arrayMove(items, activeIndex, overIndex);
        });
      }
    }
  }

};
