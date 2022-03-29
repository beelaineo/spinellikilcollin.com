export type FilterValues = Record<string, any>

export interface FilterSetState<FilterValueType = FilterValues> {
  key: string
  activeMatchKeys: string[]
  values: FilterValueType
  initialValues: FilterValueType
}
