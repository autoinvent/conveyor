import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/lib/components/ui/card";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModelIndexStore } from "../useModelIndexStore";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import type { Field } from "@/types";
import Item from "./Sort/Item";
import { SortableContainer } from "./Sort/SortableContainer";

import { changeToNoneDirection, getSortedAndNonSortedFields, sortedToSort } from "../utils";
export interface SortedItems {
  sorted: UniqueIdentifier[];
  nonSorted: UniqueIdentifier[];
}

export const ModelIndexSortSetting = () => {
  // add changes not saved until hit button

  const onTableViewChange = useModelIndexStore(
    (state) => state.tableViewOptions.onTableViewChange
  );
  const sortState = useModelIndexStore(
    (state) => state.tableViewOptions.tableView?.sort
  ); // sort to be passed to magiql endpoint

  const fields = useModelIndexStore((state) => state.fields);

  const sortedFields = fields.filter((field) => field.sortable !== false);

  const dividedFields = getSortedAndNonSortedFields(sortedFields, sortState);

  const [sort, setSort] = useState<string[] | undefined>(sortState); // our copy of the sort state
  const [sorted, setSorted] = useState<Field[]>(dividedFields.sorted); // sorted fields to render as items (UI)
  const [nonSorted, setNonSorted] = useState<Field[]>(dividedFields.nonSorted); // nonSorted fields (UI)
  const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null); // item being clicked and dragged by user
  const [overContainer, setOverContainer] = useState<
    "sorted" | "unsorted" | null
  >(null); // the container being dragged to

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // keep value of sort in sync with sorted
    setSort((prev) => sortedToSort(sorted, prev));
  }, [sorted])

  const handleApplySort = () => {
    // ensure items in the nonsorted category's directions are set to None before saving
    setSort(changeToNoneDirection(nonSorted, sort));

    if (onTableViewChange) {
      onTableViewChange({ sort: sort });
    }
  };

  const handleReset = () => {
    setNonSorted((prev) => [...prev, ...sorted]);
    setSorted([]);
    setSort([]);
  };

  const handleClear = () => {
    setSorted(dividedFields.sorted);
    setNonSorted(dividedFields.nonSorted);
  };

  const h2Styles = "text-muted-foreground text-center";

  return (
    <Card>
      <CardHeader>
        <CardDescription>Sorting is ordered in priority from top to bottom.</CardDescription>

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
          <SortableContainer
            items={sorted}
            isDragging={isDraggingOver}
            activeItem={activeItem}
            sort={sort}
            setSort={setSort}
            containerName="sorted"
          >
            <h2 className={h2Styles}>SORTED</h2>
          </SortableContainer>
          <SortableContainer
            items={nonSorted}
            isDragging={isDraggingOver}
            activeItem={activeItem}
            sort={sort}
            setSort={setSort}
            containerName="nonSorted"
          >
            <h2 className={h2Styles}>NON-SORTED</h2>
          </SortableContainer>
          {createPortal(
            <DragOverlay wrapperElement="ul">
              {isDragging && activeItem ? <Item>{activeItem}</Item> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="ghost" onClick={handleClear}>
          Restore Sort
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Clear All
        </Button>
        <Button onClick={handleApplySort}>Apply Changes</Button>
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
          setNonSorted((nonSorted) => nonSorted.toSpliced(activeIndex, 1));
          setSorted((sorted) => sorted.toSpliced(overIndex ?? 0, 0, toMove));
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