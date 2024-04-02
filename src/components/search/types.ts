export interface SearchMeta {
  label: string
  type: string
  key: string
  options?: Array<{
    [key: string]: string | number
  }>
  optionsKey?: {
    label: string
    value: string
  }
  onChange?: () => void
  rules?: Array<{
    required: boolean
    message: string
    trigger: string
  }>
  disabled?: boolean
  placeholder?: string
  maxlength?: number
  showAllLevels?: boolean
  isCascaderChecked?: boolean
  multiple?: boolean
  filterable?: boolean
  props?: {
    multiple: boolean
    expandTrigger: string
    value: string
    label: string
  }
  isHideFirstLine: boolean
}

export interface SearchModel {
  [key: string]: string | number | string[]
}
