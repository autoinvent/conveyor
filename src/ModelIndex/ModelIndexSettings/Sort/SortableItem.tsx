import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Switch } from "@/lib/components/ui/switch";
import { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  id: UniqueIdentifier;
}

export const itemStyle = "list-none space-y-1 flex justify-between";



export function SortableItem({ id }: Props) {
  // TODO: edit naming comnvetion, use fieldName instead of ID 
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

    // actual item being dragged

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [ checked, setChecked ] = useState<boolean>(true);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // className={`SortableItem${itemStyle}`}
      className={`SortableItem${itemStyle}`}

    >
      <p>{id}</p>
      {createPortal(
        <Switch
            className="testSwitch"
            labelLeft="ASC"
            labelRight="DESC"
            onClick={() => setChecked(prev => !prev)}
            checked={checked}
        />,
        document.body
      )}
    </li>
  );
}
