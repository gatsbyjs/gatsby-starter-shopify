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

/**
 * Extracts default search values from the query string
 * @param {string} query
 */
export function getValuesFromQueryString(query) {
  const {
    q: term,
    s: sortKey,
    p: productTypes,
    t: tags,
    v: vendors,
    x: maxPrice,
    n: minPrice,
  } = queryString.parse(query)
  return { term, sortKey, productTypes, tags, vendors, maxPrice, minPrice }
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
  count = 20,
  after,
  before
) {
  const [query, setQuery] = useState('')

  // Relevance is non-deterministic if there is no query, so we default to "trending" instead
  const initialSortKey = term ? 'RELEVANCE' : 'BEST_SELLING'

  useEffect(() => {
    const parts = [
      term,
      makeFilter('tag', allTags, selectedTags),
      makeFilter('product_type', allProductTypes, selectedProductTypes),
      makeFilter('vendor', allVendors, selectedVendors),
      // Exclude empty filter values
    ].filter(Boolean)

    if (maxPrice) {
      parts.push(`variants.price:<=${maxPrice}`)
    }
    if (minPrice) {
      parts.push(`variants.price:>=${minPrice}`)
    }

    const qs = queryString.stringify({
      // Don't show if falsy
      q: term || undefined,
      x: maxPrice || undefined,
      n: minPrice || undefined,
      // Don't show if sort order is default
      s: sortKey === initialSortKey ? undefined : sortKey,
      // Don't show if all values are selected
      p: makeQueryStringValue(allProductTypes, selectedProductTypes),
      v: makeQueryStringValue(allVendors, selectedVendors),
      t: makeQueryStringValue(allTags, selectedTags),
    })

    // Sorry IE, you can live without search persistence
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
    variables: {
      query,
      sortKey: sortKey || initialSortKey,
      count,
      after,
      before,
    },
    pause,
  })
}
