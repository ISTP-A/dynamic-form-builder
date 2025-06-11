import { cn } from "@/lib/utils";
import { closestCenter, closestCorners, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState, type ComponentProps } from "react";
import { GrapButton } from "../dnd-kit/grap-button";




const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};

interface FormEditorProps extends ComponentProps<'div'> {
}

export function FormEditor({ id, className, ...props }: FormEditorProps) {
  const sectionId = useId()
  const sensors = useSensors(useSensor(PointerSensor))

  const [items, setItems] = useState({
    row1: ['1', '2', '3', '4'],
    row2: ['5', '6', '7', '8'],
  })

  const objectItems = Object.entries(items)

  return (
    <div
      className={cn('w-full', className)}
      {...props}
    >
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableFormSection>
          {objectItems.map(([key, row]) => (
            <SortableFormRow
              key={sectionId + key}
              id={key}
              items={row}
            >
              {row.map((id) => (
                <GrapItemWrapper key={`row-` + id} id={id}>
                  <span className="text-sm">{id}</span>
                </GrapItemWrapper>
              ))}
            </SortableFormRow>
          ))}
        </SortableFormSection>
      </DndContext>
    </div>
  )

  function findContainer(id: string | number) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => (items[key] as any).includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id)
      const overIndex = overItems.indexOf(overId)
      console.log(activeIndex, overIndex, activeIndex === overIndex)
      if (activeIndex === overIndex) return prev
      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }



  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }
  }
}

interface FormSectionProps extends ComponentProps<'div'> {
}

export function SortableFormSection({ id, className, children, ...props }: FormSectionProps) {
  return (
    <div className={cn('w-full p-2', className)} {...props}>
      {children}
    </div>
  )

}


interface FormRowProps extends ComponentProps<'div'> {
  items: string[]
}

export function SortableFormRow({
  items,
  id,
  className,
  children,
  ...props
}: FormRowProps) {
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={horizontalListSortingStrategy}
    >
      <div
        className={cn('w-full p-2 flex gap-2 flex-nowrap border', className)}
        {...props}
      >
        {children}
      </div>
    </SortableContext>
  )
}




interface GrapItemWrapperProps extends Omit<ComponentProps<'div'>, 'id'> {
  id: string | number
}

export function GrapItemWrapper({ id, className, children, ...props }: GrapItemWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      id={id}
      ref={setNodeRef}
      className={cn('flex-1 flex items-center gap-2 p-2 border bg-secondary/50', className)}
      style={style}
      {...props}
      {...attributes}
    >
      <GrapButton {...listeners} />
      {children}
    </div>
  )
}