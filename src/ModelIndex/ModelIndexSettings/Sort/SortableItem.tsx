import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortWrapper } from "@/ModelIndex/SortWrapper";
import { getFieldSortDirection, getNextSort } from "@/ModelIndex/utils";
import type { Field } from "@/types";
interface Props {
  field: Field;
  containerName: string;
  isDragging: boolean;
  activeItem: UniqueIdentifier | null;
  sort: string[] | undefined;
  setSort: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

export const itemStyle = "list-none space-y-1 flex justify-between";

export function SortableItem({ field, containerName, isDragging, activeItem, sort, setSort }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.name });

  // actual item being dragged

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sortDirection = getFieldSortDirection(sort, field.name);
  const onNextSortDirection = () => {
    const nextSort = getNextSort(sort, field.name);
    setSort(nextSort);
  };
  

  if (field === undefined) {
    return null;
  }

  return (
    <li ref={setNodeRef} className={`SortableItem${itemStyle}${activeItem === field.name && isDragging ? " invisible" : ""}`}>
      <p style={style} {...attributes} {...listeners}>
        {field.name}
      </p>
      {containerName === "sorted" && (
        <SortWrapper
          sortDirection={sortDirection}
          onNextSortDirection={onNextSortDirection}
          sortable={field.sortable}
        />
      )}
    </li>
  );
}
