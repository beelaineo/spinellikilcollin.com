export const sanityCollectionQuery = `
*[
  _type == "shopifyCollection"
  && defined(shopifyId)
  && handle == $handle
] {
  _id,
  _type,
  _key,
  title,
  handle,
  shopifyId,
	seo{
  	"image": select(
  		defined(image.asset) => {
        image{
  				"url": asset->url,
  				"_key": asset->url,
          "metadata": asset->metadata,
          "extension": asset->extension,
          ...
				}
      }
    ),
		title,
		metaTitle,
		description,
		keywords,
	},
  hero {
    image {
  		asset->,
      ...,
    },
    mobileImage {
      asset->,
      ...,
    },
    "bodyRaw": body,
    ...,
  },
  products[$productStart...$productEnd]->[]{
    _id,
    _type,
    handle,
    minVariantPrice,
    maxVariantPrice,
    shopifyId,
    title,
    options[]{
      _key,
      _type,
      values[defined(swatch)],
      ...
    },
    sourceData {
      _type,
      handle,
      id,
      images,
      tags,
      title,
      tags,
      priceRange,
      variants {
        edges[]{
          cursor,
          node {
            _type,
            id,
            image,
            title,
            selectedOptions,
            priceV2
          },
        },
      },

    },
  },
  preferredVariantMatches,
  collectionBlocks[]{
    _key,
    format,
    body,
    ...
  },
}
`

export const moreProductsQuery = `
*[
  _type == "shopifyCollection"
  && defined(shopifyId)
  && handle == $handle
] {
 products[$productStart...$productEnd]->[]{
    _id,
    _type,
    handle,
    minVariantPrice,
    maxVariantPrice,
    shopifyId,
    title,
    options[]{
      _key,
      _type,
      values[defined(swatch)],
      ...
    },
    sourceData {
      _type,
      handle,
      id,
      images,
      tags,
      title,
      tags,
      priceRange,
      variants {
        edges[]{
          cursor,
          node {
            _type,
            id,
            image,
            title,
            selectedOptions,
            priceV2
          },
        },
      },
    },
  },
}
`
