import type { FormRowItem, ItemWidth, RadioField, SelectField } from "../types"

export function isSelectField(field: FormRowItem): field is SelectField {
  return field.type === 'select'
}

export function isRadioField(field: FormRowItem): field is RadioField {
  return field.type === 'radio'
}

export function getWidthClassName(width: ItemWidth) {
  switch(width) {
    case "full":
      return 'w-full'
    case "fit":
      return 'w-fit'
    case "relative":
      return 'flex-1'
    default:
      return ''
  }
}