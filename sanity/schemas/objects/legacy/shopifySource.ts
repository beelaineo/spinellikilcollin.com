export const imageEdge = {
  title: 'Image Edge',
  name: 'shopifySourceImageEdge',
  type: 'object',
  fields: [
    {type: 'string', name: 'key', title: 'Key'},
    {type: 'string', name: 'cursor', title: 'Key'},
    {type: 'shopifySourceImage', name: 'node', title: 'Node'},
  ],
}

export const shopifyImages = {
  title: 'Images',
  name: 'shopifySourceImages',
  type: 'object',
  fields: [
    {
      title: 'edges',
      name: 'edges',
      type: 'array',
      of: [
        {
          type: 'shopifySourceImageEdge',
        },
      ],
    },
  ],
}

export const shopifyImage = {
  title: 'Image',
  name: 'shopifySourceImage',
  type: 'object',
  fields: [
    {
      title: 'altText',
      name: 'altText',
      type: 'string',
    },
    {
      title: 'id',
      name: 'id',
      type: 'string',
    },
    {
      title: 'originalSrc',
      name: 'originalSrc',
      type: 'string',
    },
    {
      title: 'w100',
      name: 'w100',
      type: 'string',
    },
    {
      title: 'w300',
      name: 'w300',
      type: 'string',
    },
    {
      title: 'w800',
      name: 'w800',
      type: 'string',
    },
    {
      title: 'w1200',
      name: 'w1200',
      type: 'string',
    },
    {
      title: 'w1600',
      name: 'w1600',
      type: 'string',
    },
  ],
}

export const shopifySourceProductNode = {
  title: 'Shopify Source Product Node',
  name: 'shopifySourceProductNode',
  type: 'object',
  fields: [
    {name: 'handle', type: 'string'},
    {name: 'id', type: 'string'},
  ],
}

export const shopifySourceProductEdge = {
  title: 'Shopify Source Product Edge',
  name: 'shopifySourceProductEdge',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
      title: 'Cursor',
    },
    {
      name: 'node',
      type: 'shopifySourceProductNode',
    },
  ],
}

export const shopifySourceProductsConnection = {
  title: 'Shopify Source Products Connection',
  name: 'shopifySourceProductsConnection',
  type: 'object',
  fields: [
    {
      name: 'pageInfo',
      type: 'pageInfo',
    },
    {
      name: 'edges',
      type: 'array',
      of: [
        {
          type: 'shopifySourceProductEdge',
        },
      ],
    },
  ],
}

export const pageInfo = {
  name: 'pageInfo',
  type: 'object',
  fields: [
    {
      name: 'hasNextPage',
      title: 'Has Next Page',
      type: 'boolean',
    },
    {
      name: 'hasPreviousPage',
      title: 'Has Previous Page',
      type: 'boolean',
    },
  ],
}

export const linkedCollections = {
  name: 'linkedCollections',
  description: 'Synced from Shopify',
  title: 'Collections',
  type: 'array',
  options: {
    sortable: false,
  },
  readOnly: true,
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'shopifyCollection',
        },
      ],
    },
  ],
}

export const linkedProducts = {
  name: 'linkedProducts',
  title: 'Products',
  description: 'Synced from Shopify',
  type: 'array',
  options: {
    sortable: false,
  },
  readOnly: true,
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'shopifyProduct',
        },
      ],
    },
  ],
}

export const shopifySourceProductOption = {
  title: 'Product Option',
  name: 'shopifySourceProductOption',
  type: 'object',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'values',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}

export const shopifyMoneyV2 = {
  title: 'Shopify MoneyV2',
  name: 'shopifyMoneyV2',
  type: 'object',
  fields: [
    {
      name: 'amount',
      type: 'string',
    },
    {
      name: 'currencyCode',
      type: 'string',
    },
  ],
}

export const shopifySourceProductPriceRangeEdge = {
  title: 'Product Price Range Edge',
  name: 'shopifySourceProductPriceRangeEdge',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
    },
    {name: 'node', type: 'shopifySourceProductPriceRange'},
  ],
}

export const shopifySourceProductPresentmentPriceRangeConnection = {
  title: 'Product Price Range Connection',
  name: 'shopifySourceProductPresentmentPriceRangeConnection',
  type: 'object',
  fields: [
    {
      name: 'edges',
      type: 'array',
      of: [{type: 'shopifySourceProductPriceRangeEdge'}],
    },
  ],
}

export const shopifySourceProductPriceRange = {
  title: 'Product Price Range',
  name: 'shopifySourceProductPriceRange',
  type: 'object',
  fields: [
    {
      name: 'minVariantPrice',
      type: 'shopifyMoneyV2',
    },
    {
      name: 'maxVariantPrice',
      type: 'shopifyMoneyV2',
    },
  ],
}

export const shopifySourceCollectionNode = {
  title: 'Collection Node',
  name: 'shopifySourceCollectionNode',
  type: 'object',
  fields: [
    {
      name: 'handle',
      type: 'string',
    },
    {
      name: 'id',
      type: 'string',
    },
  ],
}

export const shopifySourceCollectionEdge = {
  title: 'Collection Edge',
  name: 'shopifySourceCollectionEdge',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
      title: 'Cursor',
    },
    {
      name: 'node',
      type: 'shopifySourceCollectionNode',
    },
  ],
}

export const shopifySourceCollectionsConnection = {
  title: 'Collections Connection',
  name: 'shopifySourceCollectionsConnection',
  type: 'object',
  fields: [
    {
      name: 'pageInfo',
      type: 'pageInfo',
    },
    {
      name: 'edges',
      type: 'array',
      of: [{type: 'shopifySourceCollectionEdge'}],
    },
  ],
}

export const shopifySourceProductVariantEdge = {
  title: 'Product Variant Edge',
  name: 'shopifySourceProductVariantEdge',
  type: 'object',
  fields: [
    {name: 'cursor', type: 'string'},
    {name: 'node', type: 'shopifySourceProductVariantLegacy'},
  ],
}

// export const shopifySourceProductVariantEdges = {
//   title: 'Product Variant Edges',
//   name: 'shopifySourceProductVariantEdges',
//   type: 'array',
//   of: [{type: 'shopifySourceProductVariantEdge'}],
// }

export const shopifySourceProductVariantsConnection = {
  title: 'Product Variants Connection',
  name: 'shopifySourceProductVariantsConnection',
  type: 'object',
  fields: [
    {
      name: 'pageInfo',
      type: 'pageInfo',
    },
    {
      name: 'edges',
      type: 'array',
      of: [{type: 'shopifySourceProductVariantEdge'}],
    },
  ],
}

// export const selectedOptions = {
//   title: 'Selected Option',
//   name: 'shopifySourceSelectedOption',
//   type: 'object',
//   fields: [
//     {name: 'name', type: 'string'},
//     {name: 'value', type: 'string'},
//   ],
// }

export const shopifySourceProductVariantPricePair = {
  title: 'Variant Price Pair',
  name: 'shopifySourceProductVariantPricePair',
  type: 'object',
  fields: [
    {
      name: 'compareAtPrice',
      type: 'shopifyMoneyV2',
    },
    {
      name: 'price',
      type: 'shopifyMoneyV2',
    },
  ],
}

export const shopifySourceProductPricePresentmentEdge = {
  title: 'Price Edge',
  name: 'shopifySourceProductPricePresentmentEdge',
  type: 'object',
  fields: [
    {name: 'cursor', type: 'string'},
    {name: 'node', type: 'shopifySourceProductVariantPricePair'},
  ],
}

export const shopifySoureProductVariantPricePresentmentEdges = {
  title: 'Price Edges',
  name: 'shopifySoureProductVariantPricePresentmentEdges',
  type: 'array',
  of: [{type: 'shopifySourceProductPricePresentmentEdge'}],
}

export const shopifySourceProductVariantPricePresenentmentConnection = {
  title: 'Price Connection',
  name: 'shopifySourceProductVariantPricePresenentmentConnection',
  type: 'object',
  fields: [{name: 'edges', type: 'shopifySoureProductVariantPricePresentmentEdges'}],
}
