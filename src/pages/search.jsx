import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { CheckFilter } from '../components/check-filter'
import { useProductSearch } from '../utils/hooks'
import { main, search, results, filters } from './search-page.module.css'

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

  const [selectedTags, setSelectedTags] = React.useState(tags)
  const [selectedVendors, setSelectedVendors] = React.useState(vendors)
  const [selectedProductTypes, setSelectedProductTypes] = React.useState(
    productTypes
  )

  const [searchTerm, setSearchTerm] = React.useState('')

  const [{ data, fetching, ...props }] = useProductSearch(
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
  console.log(props)
  return (
    <Layout>
      <div className={main}>
        <div className={search}>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
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
          />
          <CheckFilter
            name="Brands"
            items={vendors}
            selectedItems={selectedVendors}
            setSelectedItems={setSelectedVendors}
          />
          <CheckFilter
            open={false}
            name="Tags"
            items={tags}
            selectedItems={selectedTags}
            setSelectedItems={setSelectedTags}
          />
        </section>
        <section className={results}>
          <ul>
            {data?.products?.edges?.map(({ node }) => (
              <li>{node.title}</li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default SearchPage
