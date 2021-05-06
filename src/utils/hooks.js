import { useEffect, useState } from "react"
import queryString from "query-string"
import { useQuery } from "urql"

const ProductsQuery = `
query ($query: String!, $sortKey: ProductSortKeys, $first: Int, $last: Int, $after: String, $before: String) {
  products(
    query: $query
    sortKey: $sortKey
    first: $first
    last: $last
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
  if (selectedItems && !Array.isArray(selectedItems)) {
    selectedItems = [selectedItems]
  }
  if (allItems.length === selectedItems.length || !selectedItems?.length) {
    return
  }
  return `(${selectedItems
    .map((item) => `${field}:${JSON.stringify(item)}`)
    .join(" OR ")})`
}

function makeQueryStringValue(allItems, selectedItems) {
  if (allItems.length === selectedItems.length) {
    return []
  }
  return selectedItems
}

function arrayify(value) {
  if (!value) {
    return []
  }
  if (!Array.isArray(value)) {
    return [value]
  }
  return value
}

/**
 * Extracts default search values from the query string
 * @param {string} query
 */
export function getValuesFromQueryString(query) {
  const {
    q: term,
    s: sortKey,
    x: maxPrice,
    n: minPrice,
    p,
    t,
    v,
  } = queryString.parse(query)
  return {
    term,
    sortKey,
    maxPrice,
    minPrice,
    productTypes: arrayify(p),
    tags: arrayify(t),
    vendors: arrayify(v),
  }
}

export function useProductSearch(
  filters,
  { allTags, allProductTypes, allVendors },
  sortKey,
  pause = false,
  count = 20
) {
  const [query, setQuery] = useState("")
  const [cursors, setCursors] = useState({
    before: null,
    after: null,
  })
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = filters.term ? "RELEVANCE" : "TITLE"

  const [result] = useQuery({
    query: ProductsQuery,
    variables: {
      query,
      sortKey: sortKey || initialSortKey,
      first: !cursors.before ? count : null,
      last: cursors.before ? count : null,
      after: cursors.after,
      before: cursors.before,
    },
    pause,
  })

  useEffect(() => {
    const parts = [
      term,
      makeFilter("tag", allTags, tags),
      makeFilter("product_type", allProductTypes, productTypes),
      makeFilter("vendor", allVendors, vendors),
      // Exclude empty filter values
    ].filter(Boolean)
    if (maxPrice) {
      parts.push(`variants.price:<="${maxPrice}"`)
    }
    if (minPrice) {
      parts.push(`variants.price:>="${minPrice}"`)
    }

    setQuery(parts.join(" "))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, allTags, allProductTypes, allVendors, maxPrice, minPrice])

  useEffect(() => {
    const qs = queryString.stringify({
      // Don't show if falsy
      q: term || undefined,
      x: maxPrice || undefined,
      n: minPrice || undefined,
      // Don't show if sort order is default
      s: sortKey === initialSortKey ? undefined : sortKey,
      // Don't show if all values are selected
      p: makeQueryStringValue(allProductTypes, productTypes),
      v: makeQueryStringValue(allVendors, vendors),
      t: makeQueryStringValue(allTags, tags),
      c: cursors.after || undefined,
    })

    const url = new URL(window.location.href)
    url.search = qs
    url.hash = ""
    window.history.replaceState({}, null, url.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const fetchPreviousPage = () => {
    const products = result.data.products
    // when we go back we want all products before the first one of our array
    const previousCursor = products.edges[0].cursor
    setCursors({
      before: previousCursor,
      after: null,
    })
  }
  const fetchNextPage = () => {
    const products = result.data.products
    // when we go forward we want all products after the first one of our array
    const nextCursor = products.edges[products.edges.length - 1].cursor
    setCursors({
      before: null,
      after: nextCursor,
    })
  }

  const filterCount =
    (filters.tags.length === allTags.length ? 0 : filters.tags.length) +
    (filters.productTypes.length === allProductTypes.length
      ? 0
      : filters.productTypes.length) +
    (filters.vendors.length === allVendors.length
      ? 0
      : filters.vendors.length) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0)

  const isDefault = !filterCount && !filters.term && !sortKey

  let products
  let hasPreviousPage
  let hasNextPage

  if (!isDefault && result && result.data) {
    products = result.data.products.edges.map((edge) => edge.node)
    hasPreviousPage = result.data.products.pageInfo.hasPreviousPage
    hasNextPage = result.data.products.pageInfo.hasNextPage
  }

  return {
    data: result.data,
    isFetching: result.fetching,
    hasPreviousPage,
    hasNextPage,
    products,
    isDefault,
    filterCount,
    fetchNextPage,
    fetchPreviousPage,
  }
}
