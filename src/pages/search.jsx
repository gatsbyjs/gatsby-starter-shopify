import * as React from 'react'
import { useLocation } from '@reach/router'
import queryString from 'query-string'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { CheckFilter } from '../components/check-filter'
import ProductCard from '../components/product-card'

import { useProductSearch } from '../utils/hooks'
import {
  main,
  search,
  results,
  filters,
  productList,
  productListItem,
} from './search-page.module.css'

const SearchPage = () => {
  const {
    products: { productTypes, vendors, tags },
  } = useStaticQuery(graphql`
    query {
      products: allShopifyProduct {
        productTypes: distinct(field: productType)
        tags: distinct(field: tags)
        vendors: distinct(field: vendor)
      }
    }
  `)
  // get query params from URL if they exist, to populate default state
  const location = useLocation()
  const queryParams = queryString.parse(location.search)

  const initialTags = queryParams.Tag ? [...queryParams?.Tag?.split(',')] : tags
  const [selectedTags, setSelectedTags] = React.useState(initialTags)
  const initialVendors = queryParams.Brand
    ? [...queryParams?.Brand?.split(',')]
    : vendors
  const [selectedVendors, setSelectedVendors] = React.useState(initialVendors)
  const initialProductTypes = queryParams.Type
    ? [...queryParams?.Type?.split(',')]
    : productTypes
  const [selectedProductTypes, setSelectedProductTypes] = React.useState(
    initialProductTypes
  )

  const [searchTerm, setSearchTerm] = React.useState(queryParams.s)

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
    `RELEVANCE`
  )

  const createUrlString = (
    searchTerm,
    newItems = [],
    filterName = undefined
  ) => {
    // only add filters to the url when not all options are selected
    const shouldFilterType = productTypes.length !== selectedProductTypes.length
    const shouldFilterBrand = vendors.length !== selectedVendors.length
    const shouldFilterTags = tags.length !== selectedTags.length

    return `search?${queryString.stringify({
      s: searchTerm,
      Type: shouldFilterType ? selectedProductTypes : undefined,
      Brands: shouldFilterBrand ? selectedVendors : undefined,
      Tags: shouldFilterTags ? selectedTags : undefined,
      [filterName]: newItems.length
        ? newItems.filter(Boolean).join(',')
        : undefined,
    })}`
  }

  const onSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm)
    window.history.replaceState({}, null, createUrlString(newSearchTerm))
  }

  const onFilter = (newItems, filterName) => {
    window.history.replaceState(
      {},
      null,
      createUrlString(searchTerm, newItems, filterName)
    )
  }

  console.log(data)
  return (
    <Layout>
      <div className={main}>
        <div className={search}>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearch(e.currentTarget.value)}
            placeholder="Search..."
          />
        </div>
        <section className={filters}>
          <span>{fetching ? 'Loading...' : ' '}</span>

          <CheckFilter
            name="Type"
            items={productTypes}
            selectedItems={selectedProductTypes}
            setSelectedItems={setSelectedProductTypes}
            onFilter={onFilter}
          />
          <CheckFilter
            name="Brands"
            items={vendors}
            selectedItems={selectedVendors}
            setSelectedItems={setSelectedVendors}
            onFilter={onFilter}
          />
          <CheckFilter
            open={false}
            name="Tags"
            items={tags}
            selectedItems={selectedTags}
            setSelectedItems={setSelectedTags}
            onFilter={onFilter}
          />
        </section>
        <section className={results}>
          <ul className={productList}>
            {data?.products?.edges?.map(({ node }) => (
              <li className={productListItem}>
                <ProductCard
                  product={{
                    title: node.title,
                    priceRangeV2: node.priceRangeV2,
                    slug: `${node.slug}`,
                    images: [],
                    storefrontImages: node.images,
                    vendor: node.vendor,
                  }}
                  key={node.id}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default SearchPage
