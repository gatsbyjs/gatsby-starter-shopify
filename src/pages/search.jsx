import * as React from "react"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import slugify from "slugify"
import { CgSearch, CgChevronRight, CgChevronLeft } from "react-icons/cg"
import { Layout } from "../components/layout"
import { ProductCard } from "../components/product-card"

import {
  getValuesFromQueryString,
  useProductSearch,
  useSearchPagination,
} from "../utils/hooks"
import {
  main,
  search,
  searchIcon,
  sortSelector,
  results,
  productList as productListStyle,
  productListItem,
  pagination,
  selectedItem,
  progressStyle,
  resultsStyle,
  filterStyle,
} from "./search-page.module.css"
import { getCurrencySymbol } from "../utils/format-price"
import { Spinner } from "../components/progress"
import { Filters } from "../components/filters"

export const query = graphql`
  query {
    meta: allShopifyProduct {
      productTypes: distinct(field: productType)
      tags: distinct(field: tags)
      vendors: distinct(field: vendor)
    }
    products: allShopifyProduct(limit: 6, sort: { fields: title }) {
      edges {
        node {
          title
          vendor
          productType
          handle
          priceRangeV2 {
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
          images {
            gatsbyImageData(aspectRatio: 1, width: 200, layout: FIXED)
          }
        }
      }
    }
  }
`

export default function SearchPage({
  data: {
    meta: { productTypes, vendors, tags },
    products,
  },
}) {
  // get query params from URL if they exist, to populate default state
  const location = useLocation()

  // These default values come from the page query string
  const queryParams = getValuesFromQueryString(location.search)

  const [filters, setFilters] = React.useState(queryParams)

  const [sortKey, setSortKey] = React.useState(queryParams.sortKey)

  const {
    nextPage,
    previousPage,
    reset,
    gotoPage,
    cursor,
    setData,
    pageCount,
    nextToken,
    hasFoundLastPage,
    hasNextPage,
    hasPreviousPage,
  } = useSearchPagination()

  console.log({
    cursor,
    pageCount,
    nextToken,
    hasFoundLastPage,
    hasNextPage,
    hasPreviousPage,
  })

  const { data, fetching, isDefault } = useProductSearch(
    filters,
    {
      allProductTypes: productTypes,
      allVendors: vendors,
      allTags: tags,
    },
    sortKey,
    false,
    6,
    nextToken
  )

  console.log({ data })

  React.useEffect(() => {
    if (location.hash === "#more" && pageCount > 1) {
      nextPage()
      const url = new URL(location.href)
      url.hash = ""
      window.history.replaceState({}, null, url.toString())
    }
  }, [location.hash, pageCount])

  React.useEffect(() => {
    setData(data?.products)
  }, [data])

  // If the filters change then reset the pagination
  React.useEffect(() => {
    reset()
  }, [filters, sortKey])

  const currencyCode = getCurrencySymbol(
    products?.edges?.[0]?.node?.priceRangeV2?.minVariantPrice?.currencyCode
  )

  const productList = (isDefault ? products.edges : data?.products?.edges) || []

  return (
    <Layout>
      <div className={main}>
        <div className={search}>
          <CgSearch className={searchIcon} size={24} />
          <input
            type="search"
            value={filters.term}
            onChange={(_, term) =>
              setFilters((filters) => ({ ...filters, term }))
            }
            placeholder="Search..."
          />
          <div className={sortSelector}>
            <label for="sort">
              Sort by{" "}
              <select
                name="sort"
                id="sort"
                value={sortKey}
                onBlur={(e) => setSortKey(e.target.value)}
              >
                <option value="RELEVANCE">Relevance</option>
                <option value="PRICE">Price</option>
                <option value="TITLE">Title</option>
                <option value="CREATED_AT">New items</option>
                <option value="BEST_SELLING">Trending</option>
              </select>
            </label>
          </div>
        </div>
        <section className={filterStyle}>
          <Filters
            setFilters={setFilters}
            filters={filters}
            tags={tags}
            vendors={vendors}
            productTypes={productTypes}
            currencyCode={currencyCode}
          />
        </section>
        <section className={results} aria-busy={fetching}>
          {fetching ? (
            <p className={progressStyle}>
              <Spinner aria-valuetext="Searching" /> Searching
              {filters.term ? ` for "${filters.term}"…` : `…`}
            </p>
          ) : (
            <p className={resultsStyle}>
              Search results{" "}
              {filters.term && (
                <>
                  for "<span>{filters.term}</span>"
                </>
              )}
            </p>
          )}
          <ul className={productListStyle}>
            {productList.map(({ node }) => (
              <li className={productListItem} key={node.id}>
                <ProductCard
                  product={{
                    title: node.title,
                    priceRangeV2: node.priceRangeV2,
                    slug: `/products/${slugify(node.productType, {
                      lower: true,
                    })}/${node.handle}`,
                    images: isDefault ? node.images : [],
                    storefrontImages: !isDefault && node.images,
                    vendor: node.vendor,
                  }}
                  key={node.id}
                />
              </li>
            ))}
          </ul>
          {productList?.length && pageCount ? (
            <nav className={pagination}>
              <button
                disabled={!hasPreviousPage}
                onClick={previousPage}
                aria-label="Previous page"
              >
                <CgChevronLeft />
              </button>
              {[...Array(pageCount)].map((_, index) => (
                <button
                  onClick={() => gotoPage(index)}
                  className={index === cursor ? selectedItem : undefined}
                  key={`search${index}`}
                >
                  {index === pageCount && !hasFoundLastPage ? "…" : index + 1}
                </button>
              ))}
              <button
                disabled={!hasNextPage}
                onClick={nextPage}
                aria-label="Next page"
              >
                <CgChevronRight />
              </button>
            </nav>
          ) : undefined}
        </section>
      </div>
    </Layout>
  )
}
