import * as React from 'react'
import { Container, VisuallyHidden } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import ProductListing from '../../components/product-listing'
import SEO from '../../components/seo'

const Products = ({ data: { products } }) => {
  return (
    <Layout>
      <SEO title="All Products in Hexagon Store" />
      <VisuallyHidden as="h1">Products</VisuallyHidden>
      <Container py={20}>
        <ProductListing products={products} />
      </Container>
    </Layout>
  )
}

export default Products

export const query = graphql`
  {
    products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }) {
      nodes {
        ...ProductCard
      }
    }
  }
`
