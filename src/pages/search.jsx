import * as React from 'react'
import { useLocation } from '@reach/router'
import { graphql } from 'gatsby'
import slugify from 'slugify'
import { CgSearch, CgChevronRight, CgChevronLeft } from 'react-icons/cg'
import Layout from '../components/layout'
import { CheckFilter } from '../components/check-filter'
import ProductCard from '../components/product-card'

import { getValuesFromQueryString, useProductSearch } from '../utils/hooks'
import {
  main,
  search,
  searchIcon,
  sortSelector,
  results,
  filters,
  productList as productListStyle,
  productListItem,
  pagination,
  selectedItem,
} from './search-page.module.css'
export const query = graphql`
  query {
    meta: allShopifyProduct {
      productTypes: distinct(field: productType)
      tags: distinct(field: tags)
      vendors: distinct(field: vendor)
    }
    products: allShopifyProduct(limit: 10, sort: { fields: title }) {
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

const SearchPage = ({
  data: {
    meta: { productTypes, vendors, tags },
    products,
  },
}) => {
  // get query params from URL if they exist, to populate default state
  const location = useLocation()

  const queryParams = getValuesFromQueryString(location.search)

  const [searchTerm, setSearchTerm] = React.useState(queryParams.term)

  const [sortKey, setSortKey] = React.useState(queryParams.sortKey)

  const [selectedTags, setSelectedTags] = React.useState(
    queryParams.tags || tags
  )

  const [selectedVendors, setSelectedVendors] = React.useState(
    queryParams.vendors || vendors
  )

  const [selectedProductTypes, setSelectedProductTypes] = React.useState(
    queryParams.productTypes || productTypes
  )

  const [cursor, setCursor] = React.useState(-1)
  const [pages, setPages] = React.useState([])
  const [hasFoundLastPage, setHasFoundLastPage] = React.useState(false)

  const [{ data, fetching }] = useProductSearch(
    {
      term: searchTerm,
      selectedTags,
      selectedProductTypes,
      selectedVendors,
      allProductTypes: productTypes,
      allVendors: vendors,
      allTags: tags,
    },
    sortKey,
    false,
    10,
    cursor === -1 ? undefined : pages[cursor]
  )

  React.useEffect(() => {
    if (cursor === pages.length - 1 && data?.products?.pageInfo?.hasNextPage) {
      setPages(
        Array.from(
          new Set([
            ...pages,
            data?.products?.edges?.[data.products.edges.length - 1]?.cursor,
          ])
        )
      )
    }
    if (data?.products?.pageInfo && !data.products.pageInfo.hasNextPage) {
      setHasFoundLastPage(true)
    }
  }, [data])

  React.useEffect(() => {
    if (cursor !== -1 && pages.length !== 0) {
      setCursor(-1)
      setPages([])
    }
  }, [selectedTags, selectedProductTypes, selectedVendors, sortKey, searchTerm])

  const productList =
    (!data?.products?.edges ? products.edges : data?.products?.edges) || []

  return (
    <Layout>
      <div className={main}>
        <div className={search}>
          <CgSearch className={searchIcon} size={24} />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder="Search..."
          />
          <div className={sortSelector}>
            Sort by{' '}
            <select
              name="sort"
              id="sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="RELEVANCE">Relevance</option>
              <option value="PRICE">Price</option>
              <option value="TITLE">Title</option>
              <option value="CREATED_AT">New items</option>
              <option value="BEST_SELLING">Trending</option>
            </select>
          </div>
        </div>
        <section className={filters}>
          <CheckFilter
            name="Type"
            items={productTypes}
            selectedItems={selectedProductTypes}
            setSelectedItems={setSelectedProductTypes}
          />
          <hr />
          <CheckFilter
            name="Brands"
            items={vendors}
            selectedItems={selectedVendors}
            setSelectedItems={setSelectedVendors}
          />
          <hr />
          <CheckFilter
            open={false}
            name="Tags"
            items={tags}
            selectedItems={selectedTags}
            setSelectedItems={setSelectedTags}
          />
        </section>
        <section className={results}>
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
                    images: node.images?.edges ? [] : node.images,
                    storefrontImages: node.images?.edges && node.images,
                    vendor: node.vendor,
                  }}
                  key={node.id}
                />
              </li>
            ))}
          </ul>
          {data?.products?.pageInfo && (
            <nav className={pagination}>
              <button
                disabled={!data?.products?.pageInfo?.hasPreviousPage}
                onClick={() => setCursor(cursor - 1)}
                aria-label="Previous page"
              >
                <CgChevronLeft />
              </button>
              <button
                onClick={() => setCursor(-1)}
                className={cursor === -1 ? selectedItem : undefined}
              >
                1
              </button>
              {pages.map((_, index) => (
                <button
                  onClick={() => setCursor(index)}
                  className={index === cursor ? selectedItem : undefined}
                  key={`search${index}`}
                >
                  {index === pages.length - 1 && !hasFoundLastPage
                    ? '…'
                    : index + 2}
                </button>
              ))}
              <button
                disabled={!data?.products?.pageInfo?.hasNextPage}
                onClick={() => setCursor(cursor + 1)}
                aria-label="Next page"
              >
                <CgChevronRight />
              </button>
            </nav>
          )}
        </section>
      </div>
    </Layout>
  )
}

export default SearchPage
