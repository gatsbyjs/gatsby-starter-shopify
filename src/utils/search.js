// server-side search utils
import { urqlClient } from '../context/search-provider'
import { getValuesFromQuery } from './hooks'

// TODO: DRY this up
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

function makeFilter(field, selectedItems) {
  if (!selectedItems) return
  if (selectedItems && !Array.isArray(selectedItems)) {
    selectedItems = [selectedItems]
  }
  return `(${selectedItems
    .map((item) => `${field}:${JSON.stringify(item)}`)
    .join(" OR ")})`
}

export async function getSearchResults({
  query,
  count = 20,
  // TODO: this comes from Gatsby gql,
  // but filters might work based on the existence of query params
  // allTags,
  // allProductTypes,
  // allVendors,
}) {
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = getValuesFromQuery(query)

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = term ? "RELEVANCE" : "TITLE"

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
  const urqlQuery = parts.join(" ")

  const results = await urqlClient
    .query(ProductsQuery, {
      query: urqlQuery,
      // TODO: does not support pagination yet
      first: count,
      // sortKey: sortKey || initialSortKey,
      sortKey: initialSortKey,
    })
    .toPromise()

  const products = results.data?.products?.edges

  return products
}
