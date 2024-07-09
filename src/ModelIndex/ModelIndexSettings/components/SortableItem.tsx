import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';


interface Props {
  id: UniqueIdentifier;
}

export function SortableItem({ id }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
       <li className='SortableItem list-none space-y-1' ref={setNodeRef}>
        {id}
      </li>    
    </div>
  );
}