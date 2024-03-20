import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput from 'react-text-mask'
import { FieldProps, InputProps } from './types'
import { InputWrapper, Input as InputElement } from './styled'

export const Input = (props: InputProps) => {
  const {
    name,
    required,
    readOnly,
    disabled,
    placeholder,
    maxLength,
    type,
    color,
    renderBeforeInput,
    validate,
    mask,
  } = props
  return (
    <FormikField validate={validate} name={name}>
      {({ field }) => (
        <>
          <InputWrapper type={type}>
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
                      //@ts-ignore
                      ref={ref}
                      value={field.value || ''}
                      id={field.name}
                      color={color}
                      required={required}
                      maxLength={maxLength}
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
                maxLength={maxLength}
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
