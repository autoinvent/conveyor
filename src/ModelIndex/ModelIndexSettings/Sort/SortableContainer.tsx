import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable, type UniqueIdentifier } from "@dnd-kit/core";

import type { Field } from "@/types";

interface SortableContainerProps {
  items: Field[];
  containerName: string;
  isDragging: boolean;
  activeItem: UniqueIdentifier | null; // item being clicked
  sort: string[] | undefined;
  setSort: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  children: React.ReactNode;
}

export function SortableContainer({
  items,
  containerName,
  isDragging,
  activeItem,
  sort,
  setSort,
  children,
}: SortableContainerProps) {
  const { setNodeRef } = useDroppable({ id: containerName });

  const itemNames: UniqueIdentifier[] = items.map((item) => item.name);

  return (
    <div className="min-h-[40px]" ref={setNodeRef}>
      <SortableContext
        items={itemNames}
        id={containerName}
        strategy={verticalListSortingStrategy}
      >
        <div>
          <h3>{children}</h3>
          <ul>
            {items.length > 0
              ? items.map((field) => {
                  return (
                    <SortableItem
                      key={`${containerName}-${field.name}`}
                      field={field}
                      containerName={containerName}
                      isDragging={isDragging}
                      activeItem={activeItem}
                      sort={sort}
                      setSort={setSort}
                    />
                  );
                })
              : null}
          </ul>
        </div>
      </SortableContext>
    </div>
  );
}
