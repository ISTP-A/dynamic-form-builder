import { closestCorners, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { UsableFormFieldGroup } from "../types"
import { GrapFormFieldGroup, UsableFormDetailItem } from "../ui/fields"

interface FormItemListProps {
  items: UsableFormFieldGroup[]
  setItems: React.Dispatch<React.SetStateAction<UsableFormFieldGroup[]>>
}

export function FormItemList({ items, setItems }: FormItemListProps) {
  const sensors = useSensors(useSensor(PointerSensor))

  function handleCollpase(index: number) {
    const clone = structuredClone(items)
    const current = clone[index].collapse
    clone[index].collapse = !current
    setItems(clone)
  }

  function handleAllSelected(index: number) {
    return function (checked: boolean) {
      const clone = structuredClone(items)
      clone[index].selected = checked
      setItems(clone)
    }
  }

  function handleDetailSelected(index: number, fieldKey: string) {
    const clone = structuredClone(items)
    return function (checked: boolean) {
      clone[index].items[fieldKey].use = checked
      setItems(clone)
    }
  }
  return (
    <div className="h-full border-r overflow-y-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        autoScroll={false}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((field, parentIndex) => (
            <GrapFormFieldGroup
              id={field.id}
              key={field.id}
              item={field}
              onOpenDetails={() => handleCollpase(parentIndex)}
              onToggleAllSelected={handleAllSelected(parentIndex)}
            >
              {Object.entries(field.items).map(([fieldKey, fieldValue]) => (
                <UsableFormDetailItem
                  key={field.id + fieldKey}
                  item={fieldValue}
                  onSelect={handleDetailSelected(parentIndex, fieldKey)}
                />
              ))}
            </GrapFormFieldGroup>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setItems((prev) => {
      const oldIndex = prev.findIndex(v => v.id === active.id)
      const newIndex = prev.findIndex(v => v.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return prev

      const reordered = arrayMove(prev, oldIndex, newIndex)

      return reordered as typeof prev
    })
  }
}