import type { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import type { FormRowItem } from "./types"
import { getWidthClassName, isRadioField, isSelectField } from "./utils/render"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"


function formRender(config: FormRowItem, field: ControllerRenderProps<FieldValues, string>) {
  switch (config.type) {
    case "text":
      return <Input placeholder={config.placeholder} {...field} readOnly={config.readOnly} />
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={config.placeholder || "선택하세요"} />
          </SelectTrigger>
          <SelectContent>
            {isSelectField(config) && config.items.map(item => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case "textarea":
      return (
        <Textarea
          placeholder={config.placeholder}
          {...field}
          readOnly={config.readOnly}
        />
      )
    case "radio":
      return (
        <RadioGroup
          className="flex gap-4"
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          {isRadioField(config) && config.items.map(item => (
            <FormItem key={item.value} className="flex items-center gap-3">
              <FormControl>
                <RadioGroupItem value={item.value} />
              </FormControl>
              <FormLabel className="font-normal text-nowrap">{item.name}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      )
    case "file":
      return <Input type="file" {...field} />
    default:
      return null
  }
}

type FieldRendererProps = {
  fieldConfig: FormRowItem
  control: any
}

export const FieldRenderer = ({ fieldConfig, control }: FieldRendererProps) => {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className={getWidthClassName(fieldConfig.width)}>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>{formRender(fieldConfig, field)}</FormControl>
          {fieldConfig.description && <FormDescription>{fieldConfig.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}