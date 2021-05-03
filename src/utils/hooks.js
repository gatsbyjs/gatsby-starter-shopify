import { useCallback, useEffect, useReducer, useState } from "react"
import queryString from "query-string"
import { useQuery } from "urql"

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
  count = 20,
  after,
  before
) {
  const [query, setQuery] = useState("")

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = filters.term ? "RELEVANCE" : "TITLE"

  useEffect(() => {
    const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters
    const parts = [
      term,
      makeFilter("tag", allTags, tags),
      makeFilter("product_type", allProductTypes, productTypes),
      makeFilter("vendor", allVendors, vendors),
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
      p: makeQueryStringValue(allProductTypes, productTypes),
      v: makeQueryStringValue(allVendors, vendors),
      t: makeQueryStringValue(allTags, tags),
    })

    // Sorry IE, you can live without search persistence
    if (window.location.search !== qs && "URL" in window) {
      const url = new URL(window.location.href)
      url.search = qs
      window.history.replaceState({}, null, url.toString())
    }
    setQuery(parts.join(" "))
  }, [filters, initialSortKey, allTags, allProductTypes, allVendors, sortKey])

  const [result] = useQuery({
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

  const isDefault = !filterCount && !filters.term && !sortKey && !after

  return { ...result, isDefault, filterCount }
}

const defaultState = {
  pages: [],
  cursor: -1,
  hasNextPage: false,
  hasFoundLastPage: false,
}

function reducer(state, action) {
  console.log({ action, state })
  const { pages, cursor } = state
  switch (action.type) {
    case "next": {
      if (cursor >= pages.length - 1) {
        return state
      }
      return { ...state, cursor: cursor + 1 }
    }
    case "prev": {
      if (cursor < 0) {
        return state
      }
      return { ...state, cursor: cursor - 1 }
    }
    case "reset": {
      if (pages.length) {
        return defaultState
      }
      return state
    }
    case "setData": {
      const data = action.value
      if (!data) {
        return state
      }

      const { hasNextPage = false, hasPreviousPage = false } = data.pageInfo
      let { hasFoundLastPage = false, pages } = state

      if (data.pageInfo && !hasNextPage) {
        hasFoundLastPage = true
      }

      if (cursor === pages.length - 1) {
        pages = Array.from(
          new Set([...pages, data.edges?.[data.edges.length - 1]?.cursor])
        )
      }
      console.log("setting data to", {
        ...state,
        pages,
        hasFoundLastPage,
        hasNextPage,
        hasPreviousPage,
      })
      return { ...state, pages, hasFoundLastPage, hasNextPage, hasPreviousPage }
    }

    case "goto": {
      if (action.value < 0 || action.value > pages.length - 1) {
        return state
      }
      return { ...state, cursor: action.value - 1 }
    }

    default:
      throw new Error(action.type)
  }
}

export function useSearchPagination() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const nextPage = useCallback(() => dispatch({ type: "next" }), [])
  const previousPage = useCallback(() => dispatch({ type: "prev" }), [])
  const reset = useCallback(() => dispatch({ type: "reset" }), [])
  const gotoPage = useCallback(
    (index) => dispatch({ type: "goto", value: index }),
    []
  )
  const setData = useCallback(
    (data) => dispatch({ type: "setData", value: data }),
    []
  )

  const {
    pages,
    cursor,
    hasFoundLastPage,
    hasNextPage,
    hasPreviousPage,
  } = state

  return {
    nextPage,
    previousPage,
    reset,
    gotoPage,
    cursor: cursor + 1,
    hasFoundLastPage,
    hasNextPage,
    hasPreviousPage,
    setData,
    pageCount: pages.length + 1,
    nextToken: cursor === -1 || !pages.length ? undefined : pages[cursor],
  }
}
