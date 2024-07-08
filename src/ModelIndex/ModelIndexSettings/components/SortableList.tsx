import React, { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import type { Active } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { SortableOverlay } from "./SortableOverlay";

import type { Field } from "@/types";

interface Props {
  items: Field[];
  onChange(items: Field[]): void;
  renderItem(item: Field): ReactNode;
}

export function SortableList({
  items,
  onChange,
  renderItem
}: Props) {
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    console.log(active?.data);
  }, [active]);

  // const activeItem = useMemo(
  //   () => items.find((item) => item.name === active?.data[0]),
  //   [active, items]
  // );

  const activeItem = useMemo(
    () => items.find((item) => {
      console.log(item.name, active?.data);
      return item.name === active?.id
    }),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ name }) => name === active.id);
          const overIndex = items.findIndex(({ name }) => name === over.id);
          console.log(activeIndex, overIndex);
          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
        {items.map((item) => {
          console.log(item.name);
          return <React.Fragment key={item.name}>{renderItem(item)}</React.Fragment>
})}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;