import * as React from 'react'
import { container, visuallyHidden } from './index.module.css'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { ProductListing } from '../../components/product-listing'
import { Seo } from '../../components/seo'

export default function Products({ data: { products } }) {
  return (
    <Layout>
      <Seo title="All Products in Hexagon Store" />
      <h1 className={visuallyHidden}>Products</h1>
      <div className={container}>
        <ProductListing products={products} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: ASC }
      limit: 100
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
