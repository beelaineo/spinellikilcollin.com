import {withDocument} from 'part:@sanity/form-builder'
import {PatchEvent, set, unset} from 'part:@sanity/form-builder/patch-event'

import * as React from 'react'
import {useState, useEffect} from 'react'

import client from 'part:@sanity/base/client'
import FormField from 'part:@sanity/components/formfields/default'
import SearchableSelect from 'part:@sanity/components/selects/searchable'
import {useId} from '@reach/auto-id'

// eslint-disable-next-line react/display-name
export const ProductVariantSelector = React.forwardRef(({props}, ref) => {
  const {
    type,
    value,
    readOnly,
    level,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange,
    document,
  } = props

  const inputId = useId()

  const [inputValue, setInputValue] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [hits, setHits] = useState([])
  const [variants, setVariants] = useState([])

  useEffect(() => {
    // get product variants in an array here
    // ["Libra Gold - Not sure og my size", "Libra BG - 3", etcetera]
    // console.log('document:', document)
    // console.log('withDocument:', withDocument)
    // console.log('props:', props)
    const results = ['Variant 1', 'Variant 2', 'Variant 3']
    setVariants(results)
  }, [])

  // const handleChange = React.useCallback(
  //   (event) => {
  //     console.log('callback event:', event)
  //     const inputValue = event.props.children
  //     onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
  //   },
  //   [onChange],
  // )

  const handleChange = ({props}) => {
    onChange(PatchEvent.from(set(props.children)))
    setInputValue(null)
  }

  const handleOpen = () => {
    search('')
  }

  const handleBlur = () => {
    onBlur()
  }

  const handleFocus = () => {
    onFocus()
  }

  const handleSearch = (query) => {
    search(query)
  }

  const handleClear = () => {
    onChange(PatchEvent.from(unset()))
  }

  const search = (query) => {
    setInputValue(query)
    setHits(
      variants
        .filter((v) => v.toLowerCase().indexOf(query.toLowerCase()) > -1)
        // eslint-disable-next-line react/jsx-key
        .map((v) => <div>{v}</div>)
    )
  }

  const renderItem = (variant) => {
    return variant
  }

  return (
    <FormField
      description={type.description}
      title={type.title}
      level={level}
      __unstable_markers={markers}
      __unstable_presence={presence}
      compareValue={compareValue}
      inputId={inputId}
    >
      <SearchableSelect
        id={inputId}
        placeholder="Type to search for variant…"
        title={inputValue}
        onOpen={handleOpen}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSearch={handleSearch}
        onChange={handleChange}
        onClear={handleClear}
        value={value}
        inputValue={inputValue === null ? value : inputValue}
        renderItem={renderItem}
        isLoading={isFetching}
        items={hits}
        ref={ref}
        readOnly={readOnly}
      />
    </FormField>
  )
})

export default withDocument(ProductVariantSelector)
