import * as React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { SearchSidebar } from '../components/search-sidebar'
import Layout from '../components/layout'

const SearchPage = () => {
  const data = useStaticQuery(graphql`
    query {
      products: allShopifyProduct {
        productTypes: distinct(field: productType)
        tags: distinct(field: tags)
        vendors: distinct(field: vendor)
      }
    }
  `)

  return (
    <Layout>
      <SearchSidebar {...data.products} />
    </Layout>
  )
}

export default SearchPage
