// @ts-check
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useQuery } from 'urql'

const ProductsQuery = `
query ($query: String!, $sortKey: ProductSortKeys, $count: Int!, $after: String, $before: String) {
  products(
    query: $query
    sortKey: $sortKey
    first: $count
    after: $after
    before: $before
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
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

function makeQueryStringValue(allItems, selectedItems) {
  if (allItems.length === selectedItems.length) {
    return []
  }
  return selectedItems
}

export function getValuesFromQueryString(query) {
  const {
    q: term,
    s: sortKey,
    p: productTypes,
    t: tags,
    v: vendors,
  } = queryString.parse(query)
  return { term, sortKey, productTypes, tags, vendors }
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
  sortKey = 'RELEVANCE',
  pause = false,
  count = 20,
  after,
  before
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

    const qs = queryString.stringify({
      q: term,
      s: sortKey === 'RELEVANCE' ? undefined : sortKey,
      p: makeQueryStringValue(allProductTypes, selectedProductTypes),
      v: makeQueryStringValue(allVendors, selectedVendors),
      t: makeQueryStringValue(allTags, selectedTags),
      maxPrice,
      minPrice,
    })

    if (window.location.search !== qs && 'URL' in window) {
      const url = new URL(window.location.href)
      url.search = qs
      window.history.replaceState({}, null, url.toString())
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
    variables: { query, sortKey, count, after, before },
    pause,
  })
}
