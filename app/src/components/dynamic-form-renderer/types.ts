// global 
export interface LayoutType {
  title?: string
  description?: string
  sort?: number
}

export interface FieldCondition {
  when: string
  is: any
  operator?: 'equals' | 'notEquals' | 'in' | 'notIn' | 'exists' | 'notExists'
}

// section 
export interface FormSection extends LayoutType {
  items: FormRow[]
}

// row
export type FormRowItem = TextField | TextareaField | SelectField | RadioField | FileField
export interface FormRow extends LayoutType {
  items: FormRowItem[]
  repeatable?: boolean
  repeatConfig?: RepeatableConfig
}

export interface RepeatableConfig {
  minItems?: number
  maxItems?: number
  allowAdd?: boolean
  allowRemove?: boolean
  itemLabel?: string
}

// item
export type ItemType = 'text' | 'select' | 'radio' | 'textarea' | 'file'
export type ItemWidth = 'full' | 'fit' | 'relative'

export interface ItemField {
  type: ItemType
  name: string
  label: string
  width: ItemWidth
  description?: string
  placeholder?: string
  required?: boolean
  readOnly?: boolean
}

export interface TextField extends ItemField {
  max?: number
  min?: number
}

export interface TextareaField extends ItemField {
  max?: number
  min?: number
}


export interface SelectItem {
  name: string
  value: string
}

export interface SelectField extends ItemField {
  items: SelectItem[]
}


export interface RadioItem {
  name: string
  value: string
}

export interface RadioField extends ItemField {
  items: RadioItem[]
}

export interface FileField extends ItemField {

}