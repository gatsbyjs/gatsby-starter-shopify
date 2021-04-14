import * as React from 'react'
import { useLocation } from '@reach/router'
import { graphql } from 'gatsby'
import slugify from 'slugify'
import { CgSearch } from 'react-icons/cg'
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
  productList,
  productListItem,
  pagination,
  selectedItem,
} from './search-page.module.css'

export const query = graphql`
  query {
    products: allShopifyProduct {
      productTypes: distinct(field: productType)
      tags: distinct(field: tags)
      vendors: distinct(field: vendor)
    }
  }
`

const SearchPage = ({
  data: {
    products: { productTypes, vendors, tags },
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
        Array.from(new Set([...pages, data?.products?.edges?.[0]?.cursor]))
      )
    }
    if (data?.products?.pageInfo && !data.products.pageInfo.hasNextPage) {
      setHasFoundLastPage(true)
    }
  }, [data])

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
          <ul className={productList}>
            {data?.products?.edges?.map(({ node }) => (
              <li className={productListItem} key={node.id}>
                <ProductCard
                  product={{
                    title: node.title,
                    priceRangeV2: node.priceRangeV2,
                    slug: `/products/${slugify(node.productType, {
                      lower: true,
                    })}/${node.handle}`,
                    images: [],
                    storefrontImages: node.images,
                    vendor: node.vendor,
                  }}
                  key={node.id}
                />
              </li>
            ))}
          </ul>
          <nav className={pagination}>
            <button
              disabled={!data?.products?.pageInfo?.hasPreviousPage}
              onClick={() => setCursor(cursor - 1)}
              aria-label="Previous page"
            >
              &lt;
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
              &gt;
            </button>
          </nav>
        </section>
      </div>
    </Layout>
  )
}

export default SearchPage
