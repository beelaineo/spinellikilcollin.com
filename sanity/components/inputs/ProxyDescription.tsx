import {LockIcon} from '@sanity/icons'
import {Box, Text, TextArea, Tooltip} from '@sanity/ui'
import {TextInputProps, useFormValue, SanityDocument, TextSchemaType} from 'sanity'
import get from 'lodash.get'

const ProxyDescriptionInput = (props: any) => {
  const {schemaType} = props

  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument

  const proxyValue = path ? (get(doc, path) as string) : ''

  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            This value is set in Shopify (<code>{path}</code>)
          </Text>
        </Box>
      }
      portal
    >
      <TextArea readOnly={true} value={proxyValue} />
    </Tooltip>
  )
}

export default ProxyDescriptionInput
