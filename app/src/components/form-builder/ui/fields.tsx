import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { ChevronRight, GripVertical } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import type { UsableFormField, UsableFormFieldGroup } from '../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GrapButton } from '@/components/dnd-kit/grap-button'

interface UsableFormFieldGroupProps {
  item: UsableFormFieldGroup
  onOpenDetails: () => void
  onToggleAllSelected: (checked: boolean) => void
}

export function UsableFormFieldGroup({ item, onOpenDetails, onToggleAllSelected, children }: PropsWithChildren<UsableFormFieldGroupProps>) {
  return (
    <div className='w-full'>
      <div className='p-2'>
        <div className='flex gap-2 items-center'>
          <Button
            className='cursor-pointer'
            size='icon'
            variant='ghost'
            onClick={onOpenDetails}
          >
            <ChevronRight size={14} className={cn(item.collapse && "rotate-90 duration-75")} />
          </Button>
          <h2 className='flex-1 font-semibold'>{item.title}</h2>
          <Switch
            checked={item.selected}
            onCheckedChange={onToggleAllSelected}
          />
        </div>
      </div>
      {item.collapse && <UsableFormDetailContainer>{children}</UsableFormDetailContainer>}
    </div>
  )
}

interface GrapUsableFormFieldGroupProps {
  id: number | string
  item: UsableFormFieldGroup
  onOpenDetails: () => void
  onToggleAllSelected: (checked: boolean) => void
}

export function GrapFormFieldGroup({ id, item, onOpenDetails, onToggleAllSelected, children }: PropsWithChildren<GrapUsableFormFieldGroupProps>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className='p-2'>
        <div className='flex gap-2 items-center'>
          <Button
            className='cursor-pointer'
            variant='ghost'
            size='icon'
            onClick={onOpenDetails}
          >
            <ChevronRight
              size={14}
              className={cn(item.collapse && "rotate-90 duration-75")}
            />
          </Button>
          <h2 className='flex-1 text-sm font-medium'>{item.title}</h2>
          <Switch
            checked={item.selected}
            onCheckedChange={onToggleAllSelected}
            className='cursor-pointer'
          />
          <GrapButton {...listeners} />
        </div>
      </div>
      {item.collapse && <UsableFormDetailContainer>{children}</UsableFormDetailContainer>}
    </div>
  )
}


export function UsableFormDetailContainer({ children }: PropsWithChildren) {
  return <div className='bg-secondary'>{children}</div>
}

interface UsableFormDetailItemProps {
  item: UsableFormField
  onSelect: (checked: boolean) => void
}

export function UsableFormDetailItem({ item, onSelect }: UsableFormDetailItemProps) {
  return (
    <div className='flex items-center gap-2 p-4 border-b last:border-none'>
      <p className='text-sm font-medium flex-1'>{item.field.label}</p>
      <Switch
        checked={item.use}
        onCheckedChange={onSelect}
        className='cursor-pointer'
      />
    </div>
  )
}