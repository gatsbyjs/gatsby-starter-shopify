// @ts-check
import { useEffect, useState } from 'react'
import { useQuery } from 'urql'

const ProductsQuery = `
query ($query: String!, $sortKey: ProductSortKeys, $count: Int!) {
   products( query: $query, sortKey: $sortKey, first: $count) {
      edges {
        node {
          title
          vendor
          productType
          handle
          priceRangeV2: priceRange {
            minVariantPrice {
              currencyCode
              amount
            }
            maxVariantPrice {
              currencyCode
              amount
            }
          }
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                width
                height
                altText
              }
            }
          }
        }
      }
    }
  }
`

function makeFilter(field, allItems, selectedItems) {
  if (allItems.length === selectedItems.length) {
    return
  }
  return `(${selectedItems
    .map((item) => `${field}:${JSON.stringify(item)}`)
    .join(' OR ')})`
}

export function useProductSearch(
  {
    term,
    allTags,
    selectedTags,
    allProductTypes,
    selectedProductTypes,
    allVendors,
    selectedVendors,
    minPrice,
    maxPrice,
  },
  sortKey,
  pause = false,
  count = 20
) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const parts = [
      term,
      makeFilter('tag', allTags, selectedTags),
      makeFilter('product_type', allProductTypes, selectedProductTypes),
      makeFilter('vendor', allVendors, selectedVendors),
    ].filter(Boolean)

    if (maxPrice) {
      parts.push(`variants.price:<=${maxPrice}`)
    }
    if (minPrice) {
      parts.push(`variants.price:>=${minPrice}`)
    }

    setQuery(parts.join(' '))
  }, [
    term,
    allTags,
    selectedTags,
    allProductTypes,
    selectedProductTypes,
    allVendors,
    selectedVendors,
    minPrice,
    maxPrice,
  ])

  return useQuery({
    query: ProductsQuery,
    variables: { query, sortKey, count },
    pause,
  })
}
