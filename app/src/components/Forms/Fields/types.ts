import { FieldValidator } from 'formik'

export interface Option {
  value: string | number
  id: string
  label: string | number
  disabled?: boolean
}

export type Mask = Array<string | RegExp>

export interface FieldProps {
  label?: string | React.ReactNode
  name: string
  helpText?: string
  children?: React.ReactNode
  disabled?: boolean
  placeholder?: string
  min?: number
  max?: number
  required?: boolean
  type?: string
  color?: string
  options?: Option[]
  validate?: FieldValidator
  mask?: Mask
  /* eslint-disable-next-line */
  onChange?: (e: React.ChangeEvent<any>) => void
  readOnly?: boolean
}

export interface InputProps extends FieldProps {
  type?: string
  renderBeforeInput?: () => React.ReactNode
}
