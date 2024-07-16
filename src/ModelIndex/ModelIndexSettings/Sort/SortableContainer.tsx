import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";
import { generateUID } from "@/utils";

import type { UniqueIdentifier } from "@dnd-kit/core";
import type { Field } from "@/types";

interface SortableContainerProps {
  items: Field[];
  id: string;
  isDragging: boolean;
  activeItem: UniqueIdentifier | null;
  // sort: string[] | undefined;
  // fields: Field[];
  children: React.ReactNode;
}

export function SortableContainer({ items, id, isDragging, activeItem, children }: SortableContainerProps){
  // items: array of the field names
  // id is name of the container
  // children is the react nodes, in this case just a title

  const {setNodeRef} = useDroppable({ id });

  const itemNames: UniqueIdentifier[] = items.length > 0 ? items.map((item) => item ? item.name : "nothing") : ["empty"];

  return (
    <div className="min-h-[40px]" ref={setNodeRef}>
      <SortableContext items={itemNames} id={id} strategy={verticalListSortingStrategy}>
        <div>
          <h3>{children}</h3>
          <ul>
            {items.length > 0 ? items.map((field) => {
              return (
              <SortableItem key={`${id}-${field.name}`} field={field} containerName={id} isDragging={isDragging} activeItem={activeItem}>
              </SortableItem>
            )}): null}
          </ul>
        </div>
      </SortableContext>
    </div>
  );
};