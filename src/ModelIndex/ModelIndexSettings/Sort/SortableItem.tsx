import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortWrapper } from "@/ModelIndex/SortWrapper";
import { useModelIndexStore } from "@/ModelIndex/useModelIndexStore";
import { getFieldSortDirection, getNextSort } from "@/ModelIndex/utils";
import type { Field } from "@/types";
import { useState } from "react";
interface Props {
  field: Field;
  containerName: string;
  // sort: string[] | undefined;
  // fields: Field[];
}

export const itemStyle = "list-none space-y-1 flex justify-between";

export function SortableItem({ field, containerName}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.name });

  // actual item being dragged

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sort = useModelIndexStore((state) => state.tableView?.sort);
  const onTableViewChange = useModelIndexStore(
    (state) => state.onTableViewChange,
  );
  const sortDirection = getFieldSortDirection(sort, field.name);
  const onNextSortDirection = () => {
    const nextSort = getNextSort(sort, field.name);
    onTableViewChange?.({ sort: nextSort });
  };

  if (field === undefined) {
    return null;
  }

  return (
    <li ref={setNodeRef} className={`SortableItem${itemStyle}`}>
      <p style={style} {...attributes} {...listeners}>
        {field.name}
      </p>
      {containerName === "sorted" && (
        // <SortWrapper
        //   sortDirection={sortDirection}
        //   onNextSortDirection={onNextSortDirection}
        //   sortable={field.sortable}
        // />
        <p>ASC</p>
      )}
    </li>
  );
}
