import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput from 'react-text-mask'
import { FieldProps } from './Field'
import { Label, InputWrapper, Input as InputElement } from './styled'

export interface InputProps extends FieldProps {
  type?: string
  renderBeforeInput?: () => React.ReactNode
}

export const Input = (props: InputProps) => {
  const {
    label,
    name,
    required,
    readOnly,
    disabled,
    placeholder,
    type,
    color,
    mask,
    renderBeforeInput,
    validate,
  } = props
  return (
    <FormikField validate={validate} name={name}>
      {({ field }) => (
        <>
          {label ? (
            <Label required={required} htmlFor={name}>
              {label}
            </Label>
          ) : null}
          <InputWrapper>
            {renderBeforeInput ? renderBeforeInput() : null}
            {mask ? (
              <MaskedInput
                mask={mask}
                onChange={field.onChange}
                placeholder={placeholder}
                placeholderChar="&ensp;"
                readOnly={readOnly}
                render={(ref, maskProps) => {
                  return (
                    <InputElement
                      {...maskProps}
                      ref={ref}
                      value={field.value || ''}
                      id={field.name}
                      color={color}
                      required={required}
                      type={type}
                      disabled={disabled}
                    />
                  )
                }}
              />
            ) : (
              <InputElement
                {...field}
                value={field.value || ''}
                id={field.name}
                required={required}
                placeholder={placeholder}
                color={color}
                type={type}
                readOnly={readOnly}
                disabled={disabled}
              />
            )}
          </InputWrapper>
        </>
      )}
    </FormikField>
  )
}
