import { useEffect, useState, useMemo } from "react"
import queryString from "query-string"
import { useQuery } from "urql"
import {
  ProductsQuery,
  makeFilter,
} from './search'

function makeQueryStringValue(allItems, selectedItems) {
  if (allItems.length === selectedItems.length) {
    return []
  }
  return selectedItems
}

function createQuery (filters) {
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters
  const parts = [
    term,
    makeFilter("tag", tags),
    makeFilter("product_type", productTypes),
    makeFilter("vendor", vendors),
    // Exclude empty filter values
  ].filter(Boolean)
  if (maxPrice) {
    parts.push(`variants.price:<="${maxPrice}"`)
  }
  if (minPrice) {
    parts.push(`variants.price:>="${minPrice}"`)
  }

  return parts.join(" ")
}

export function useProductSearch(
  filters,
  { allTags, allProductTypes, allVendors },
  sortKey,
  pause = false,
  count = 20,
  initialData = [],
  initialFilters,
) {
  const [query, setQuery] = useState(createQuery(filters))
  const [cursors, setCursors] = useState({
    before: null,
    after: null,
  })
  const [initialRender, setInitialRender] = useState(true)
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = filters.term ? "RELEVANCE" : "TITLE"

  // only fetch after the filters have changed
  const shouldPause = useMemo(() => (query === createQuery(initialFilters)) || pause, [query, pause])

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
    pause: shouldPause,
  })

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
    setQuery(createQuery(filters))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const fetchPreviousPage = () => {
    // when we go back we want all products before the first one of our array
    const previousCursor = result.data.products.edges[0].cursor
    setCursors({
      before: previousCursor,
      after: null,
    })
  }
  const fetchNextPage = () => {
    // when we go forward we want all products after the first one of our array
    const nextCursor = result.data.products.edges[products.edges.length - 1].cursor
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

  let hasPreviousPage
  let hasNextPage

  const products = useMemo(() => {
    if (query === createQuery(initialFilters)) {
      return initialData
    }
    if (result.data && initialRender) setInitialRender(false)
    return result.data?.products?.edges || []
  }, [query, result.data])

  if (result && result.data) {
    hasPreviousPage = result.data.products.pageInfo.hasPreviousPage
    hasNextPage = result.data.products.pageInfo.hasNextPage
  }

  const isFetching = !initialRender && result.fetching

  return {
    data: result.data,
    isFetching,
    hasPreviousPage,
    hasNextPage,
    products,
    filterCount,
    fetchNextPage,
    fetchPreviousPage,
  }
}
