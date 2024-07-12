import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: UniqueIdentifier;
}

export const itemStyle = "list-none space-y-1";

export function SortableItem({ id }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

    // actual item being dragged

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`SortableItem${itemStyle}`}
    >
      {id}
    </li>
  );
}
