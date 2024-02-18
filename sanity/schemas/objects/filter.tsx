import * as React from 'react'
import {defineField, defineType} from 'sanity'

const FilterMatchPreview = (props: any) => {
  const {match, type} = props
  // console.log('FilterMatch props', props)
  if (!type || !match) {
    return <h2>(empty)</h2>
  }

  const titlePrefix =
    type === 'tag'
      ? 'Product tags include'
      : type === 'type'
      ? 'Product type equals'
      : type === 'option'
      ? 'Product options include'
      : type === 'title'
      ? 'Product title includes'
      : type === 'subcategory'
      ? 'Product subcategory equals'
      : type === 'metal'
      ? 'Product variant metals include'
      : type === 'style'
      ? 'Product variant style equals'
      : type === 'stone'
      ? 'Product variant stones include'
      : type === 'size'
      ? 'Variant sizes include'
      : null
  if (!titlePrefix) {
    throw new Error(`Could not generate title prefix for type "${type}"`)
  }

  return (
    <h4 style={{fontWeight: 400, margin: 0}}>
      {titlePrefix}:{' '}
      <pre
        style={{
          display: 'inline',
          padding: '0 4px',
          backgroundColor: '#f3eded',
        }}
      >
        {match}
      </pre>
    </h4>
  )
}

export const filterMatch = defineType({
  name: 'filterMatch',
  title: 'Filter Match',
  type: 'object',
  components: {
    preview: FilterMatchPreview,
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'By Product Subcategory', value: 'subcategory'},
          {
            title:
              'By Variant Size (note: does not exclude non-matches, only reorders query results)',
            value: 'size',
          },
          {title: 'By Variant Metal', value: 'metal'},
          {title: 'By Variant Style', value: 'style'},
          {title: 'By Variant Stone', value: 'stone'},
          {title: 'By Tag', value: 'tag'},
          {title: 'By Product Type', value: 'type'},
          {title: 'By Product Title', value: 'title'},
          {title: 'By Option Name', value: 'option'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'match',
      type: 'string',
      title: 'Match',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      match: 'match',
    },
  },
})

const FilterPreview = (props: any) => {
  const {label, matches} = props
  if (!matches) return null
  const tagMatches = matches.filter((m: any) => m.type === 'tag')
  const typeMatches = matches.filter((m: any) => m.type === 'type')
  const titleMatches = matches.filter((m: any) => m.type === 'title')
  const optionMatches = matches.filter((m: any) => m.type === 'option')
  const subcategoryMatches = matches.filter((m: any) => m.type === 'subcategory')
  const metalMatches = matches.filter((m: any) => m.type === 'metal')
  const styleMatches = matches.filter((m: any) => m.type === 'style')
  const stoneMatches = matches.filter((m: any) => m.type === 'stone')
  const sizeMatches = matches.filter((m: any) => m.type === 'size')
  const subtitles = [
    titleMatches.length
      ? `Matches title: ${titleMatches.map(({match}: any) => match).join(', ')}`
      : null,
    tagMatches.length
      ? `Matches tags: ${tagMatches.map(({match}: any) => match).join(', ')}`
      : null,
    optionMatches.length
      ? `Matches options: ${optionMatches.map(({match}: any) => match).join(', ')}`
      : null,
    typeMatches.length
      ? `Matches type: ${typeMatches.map(({match}: any) => match).join(', ')}`
      : null,
    subcategoryMatches.length
      ? `Matches subcategory: ${subcategoryMatches.map(({match}: any) => match).join(', ')}`
      : null,
    metalMatches.length
      ? `Matches metal: ${metalMatches.map(({match}: any) => match).join(', ')}`
      : null,
    styleMatches.length
      ? `Matches style: ${styleMatches.map(({match}: any) => match).join(', ')}`
      : null,
    stoneMatches.length
      ? `Matches stone: ${stoneMatches.map(({match}: any) => match).join(', ')}`
      : null,
    sizeMatches.length
      ? `Matches size: ${sizeMatches.map(({match}: any) => match).join(', ')}`
      : null,
  ].filter(Boolean)
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <h4 style={{fontWeight: 500, margin: '0 15px 0 0'}}>{label}</h4>
      <div>
        {subtitles.map((subtitle) => (
          <h6 key={subtitle} style={{color: 'gray', fontWeight: 400, margin: 0}}>
            {subtitle}
          </h6>
        ))}
      </div>
    </div>
  )
}

export const filter = defineType({
  name: 'filter',
  type: 'object',
  title: 'Filter',
  components: {
    preview: FilterPreview,
  },
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'matches',
      title: 'Matches any of:',
      type: 'array',
      of: [{type: 'filterMatch'}],
    }),
  ],
  preview: {
    select: {
      label: 'label',
      matches: 'matches',
    },
  },
})

export const filterSet = defineType({
  name: 'filterSet',
  title: 'Filter Set',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filters',
      title: 'Filters',
      type: 'array',
      of: [{type: 'filter'}],
    }),
    defineField({
      name: 'searchOnly',
      title: 'Search Filter Only',
      description: 'If selected, this filter will not appear on collection page filters',
      type: 'boolean',
    }),
  ],
})
