import { useSortable } from '@dnd-kit/sortable'
import { GrapButton } from './grap-button'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  )
}


export function GrapSortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      className='flex items-center'
      style={style}
    >
      {props.children}
      <GrapButton {...attributes} {...listeners} />
    </div>
  )
}