import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

import type { UniqueIdentifier } from "@dnd-kit/core";

interface SortableContainerProps {
  items: UniqueIdentifier[];
  id: string;
  children: React.ReactNode;
}

export function SortableContainer({ items, id, children }: SortableContainerProps){
  // items: array of the field names
  // id is name of the container
  // children is the react nodes, in this case just a title

  const {setNodeRef} = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      <SortableContext items={items} id={id} strategy={verticalListSortingStrategy}>
        <div>
          <h3>{children}</h3>
          <ul>
            {items.map((item) => (
              <SortableItem key={item} id={item}>
              </SortableItem>
            ))}
          </ul>
        </div>
      </SortableContext>
    </div>
  );
};