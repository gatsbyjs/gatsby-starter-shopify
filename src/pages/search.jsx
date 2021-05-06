import * as React from "react"
import { graphql } from "gatsby"
import slugify from "@sindresorhus/slugify"
import debounce from "debounce"
import { CgChevronRight, CgChevronLeft } from "react-icons/cg"
import { Layout } from "../components/layout"
import CrossIcon from "../icons/cross"
import SortIcon from "../icons/sort"
import FilterIcon from "../icons/filter"
import SearchIcon from "../icons/search"
import { ProductCard } from "../components/product-card"
import { getValuesFromQueryString, useProductSearch } from "../utils/hooks"
import { getCurrencySymbol } from "../utils/format-price"
import { Spinner } from "../components/progress"
import { Filters } from "../components/filters"
import { SearchProvider } from "../context/search-provider"
import {
  visuallyHidden,
  main,
  search,
  searchIcon,
  sortSelector,
  results,
  productList as productListStyle,
  productListItem,
  pagination,
  paginationButton,
  progressStyle,
  resultsStyle,
  filterStyle,
  clearSearch,
  searchForm,
  sortIcon,
  filterButton,
  filterTitle,
  modalOpen,
  activeFilters,
  filterWrap,
} from "./search-page.module.css"

export const query = graphql`
  query {
    meta: allShopifyProduct {
      productTypes: distinct(field: productType)
      tags: distinct(field: tags)
      vendors: distinct(field: vendor)
    }
    products: allShopifyProduct(limit: 24, sort: { fields: title }) {
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

function SearchPage({
  data: {
    meta: { productTypes, vendors, tags },
    products,
  },
  location,
}) {
  // These default values come from the page query string
  const queryParams = getValuesFromQueryString(location.search)
  const [filters, setFilters] = React.useState(queryParams)
  const [sortKey, setSortKey] = React.useState(queryParams.sortKey)
  // We clear the hash when searching, we want to make sure the next page will be fetched due the #more hash.
  const shouldLoadNextPage = React.useRef(false)

  // This modal is only used on mobile
  const [showModal, setShowModal] = React.useState(false)

  const {
    data,
    isFetching,
    filterCount,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useProductSearch(
    filters,
    {
      allProductTypes: productTypes,
      allVendors: vendors,
      allTags: tags,
    },
    sortKey,
    false,
    24 // Products per page
  )

  // If we're using the default filters, use the products from the Gatsby data layer.
  // Otherwise, use the data from search.
  const isDefault = !data
  const productList = (isDefault ? products.edges : data?.products?.edges) ?? []

  // Scroll up when navigating
  React.useEffect(() => {
    if (!showModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
        // eslint-disable-next-line react-hooks/exhaustive-deps
      })
    }
  }, [productList, showModal])

  // Stop page from scrolling when modal is visible
  React.useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
  }, [showModal])

  // Automatically load the next page if "#more" is in the URL
  React.useEffect(() => {
    if (location.hash === "#more") {
      // save state so we can fetch it when the first page got fetched to retrieve the cursor
      shouldLoadNextPage.current = true
    }

    if (shouldLoadNextPage.current) {
      if (hasNextPage) {
        fetchNextPage()
      }

      shouldLoadNextPage.current = false
    }
  }, [location.hash])

  const currencyCode = getCurrencySymbol(
    products?.[0]?.node?.priceRangeV2?.minVariantPrice?.currencyCode
  )

  return (
    <Layout>
      <h1 className={visuallyHidden}>Search Results</h1>
      <div className={main}>
        <div className={search} aria-hidden={modalOpen}>
          <SearchBar defaultTerm={filters.term} setFilters={setFilters} />
          <button
            className={[
              filterButton,
              filterCount ? activeFilters : undefined,
            ].join(" ")}
            onClick={() => setShowModal((show) => !show)}
            // This is hidden because the filters are already visible to
            // screenreaders, so the modal isnt needed.
            aria-hidden
          >
            <FilterIcon />
          </button>
          <div className={sortSelector}>
            <label>
              <span>Sort by:</span>
              <select
                value={sortKey}
                // eslint-disable-next-line
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="RELEVANCE">Relevance</option>
                <option value="PRICE">Price</option>
                <option value="TITLE">Title</option>
                <option value="CREATED_AT">New items</option>
                <option value="BEST_SELLING">Trending</option>
              </select>
            </label>
            <SortIcon className={sortIcon} />
          </div>
        </div>
        <section className={[filterStyle, showModal && modalOpen].join(" ")}>
          <div className={filterTitle}>
            <h2>Filter</h2>
            <button aria-hidden onClick={() => setShowModal(false)}>
              <CrossIcon />
            </button>
          </div>
          <div className={filterWrap}>
            <Filters
              setFilters={setFilters}
              filters={filters}
              tags={tags}
              vendors={vendors}
              productTypes={productTypes}
              currencyCode={currencyCode}
            />
          </div>
        </section>
        <section
          className={results}
          aria-busy={isFetching}
          aria-hidden={modalOpen}
        >
          {isFetching ? (
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
            {!isFetching &&
              productList.map(({ node }, index) => (
                <li className={productListItem} key={node.id}>
                  <ProductCard
                    eager={index === 0}
                    product={{
                      title: node.title,
                      priceRangeV2: node.priceRangeV2,
                      slug: `/products/${slugify(node.productType)}/${
                        node.handle
                      }`,
                      // The search API and Gatsby data layer have slightly different images available.
                      images: isDefault ? node.images : [],
                      storefrontImages: !isDefault && node.images,
                      vendor: node.vendor,
                    }}
                  />
                </li>
              ))}
          </ul>
          {hasPreviousPage || hasNextPage ? (
            <Pagination
              previousPage={fetchPreviousPage}
              hasPreviousPage={hasPreviousPage}
              nextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          ) : undefined}
        </section>
      </div>
    </Layout>
  )
}

function SearchBar({ defaultTerm, setFilters }) {
  const [term, setTerm] = React.useState(defaultTerm)
  const debouncedSetFilters = React.useCallback(
    debounce((value) => {
      setFilters((filters) => ({ ...filters, term: value }))
    }, 200),
    [setFilters]
  )

  return (
    <form onSubmit={(e) => e.preventDefault()} className={searchForm}>
      <SearchIcon aria-hidden className={searchIcon} />
      <input
        type="text"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          debouncedSetFilters(e.target.value)
        }}
        placeholder="Search..."
      />
      {term ? (
        <button
          className={clearSearch}
          type="reset"
          onClick={() => {
            setTerm("")
            setFilters((filters) => ({ ...filters, term: "" }))
          }}
          aria-label="Clear search query"
        >
          <CrossIcon />
        </button>
      ) : undefined}
    </form>
  )
}
/**
 * Shopify only supports next & previous navigation
 */
function Pagination({ previousPage, hasPreviousPage, nextPage, hasNextPage }) {
  return (
    <nav className={pagination}>
      <button
        className={paginationButton}
        disabled={!hasPreviousPage}
        onClick={previousPage}
        aria-label="Previous page"
      >
        <CgChevronLeft />
      </button>
      <button
        className={paginationButton}
        disabled={!hasNextPage}
        onClick={nextPage}
        aria-label="Next page"
      >
        <CgChevronRight />
      </button>
    </nav>
  )
}

export default function SearchPageTemplate(props) {
  return (
    <SearchProvider>
      <SearchPage {...props} />
    </SearchProvider>
  )
}
