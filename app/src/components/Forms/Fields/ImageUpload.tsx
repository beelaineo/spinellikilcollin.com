import * as React from 'react'
import { Field as FormikField, useField, useFormikContext } from 'formik'
import { FieldProps } from './types'

export const ImageUpload = ({
  name,
  maxSize = 500000,
  ...props
}: FieldProps) => {
  const [field, meta, helpers] = useField(name)
  const { setFieldValue } = useFormikContext()

  const handleChange = (event) => {
    const file = event.currentTarget.files[0]
    if (file && file.size > maxSize) {
      helpers.setError('Max file size exceeded.')
    } else {
      helpers.setError(undefined)
      setFieldValue(name, file)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </div>
  )
}
