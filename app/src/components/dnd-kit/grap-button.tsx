import type { ComponentProps } from "react"
import { GripVertical } from "lucide-react"
import { Button } from "../ui/button"

export function GrapButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='cursor-grab active:cursor-grabbing text-grap'
      {...props}
    >
      <GripVertical size={14} />
    </Button>
  )
}