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
import { Switch } from "@/lib/components/ui/switch";
export interface SortedItems {
  sorted: UniqueIdentifier[];
  nonSorted: UniqueIdentifier[];
}

export const ModelIndexSortSetting = () => {
  // add changes not saved until hit button

  const sort = useModelIndexStore((state) => state.tableView?.sort); // sort to be passed to magiql endpoint
  const fields = useModelIndexStore((state) => state.fields);

  const sortedNames = fields
    .filter((field) => field.sortable)
    .map((item) => item.name); // get names of all fields (unique identifiers)
  const nonSortedNames = fields
    .filter((field) => !field.sortable)
    .map((item) => item.name);

  const [sorted, setSorted] = useState<UniqueIdentifier[]>(sortedNames);
  const [nonSorted, setNonSorted] =
    useState<UniqueIdentifier[]>(nonSortedNames);
  const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null);
  const [overContainer, setOverContainer] = useState<
    "sorted" | "unsorted" | null
  >(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  // const [checked, setChecked] = useState<boolean>(false);

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
      {/* <Switch
          className="testSwitch"
          labelLeft="ASC"
          labelRight="DESC"
          onClick={() => setChecked(prev => !prev)}
          checked={checked}

      /> */}
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
        <Button>Apply Sort</Button>
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
          setSorted(sorted.toSpliced(activeIndex, 1)); // delete from sorted
          setNonSorted(nonSorted.toSpliced(overIndex + 1, 0, activeId)); // add to unsorted
        } else if (activeContainer === "nonSorted") {
          setNonSorted(nonSorted.toSpliced(activeIndex, 1)); // delete from nonSorted
          setSorted(sorted.toSpliced(overIndex + 1, 0, activeId)); // add to sorted
        }
      }
      if (activeContainer === "sorted") {
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
