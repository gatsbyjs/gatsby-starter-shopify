import * as React from 'react'
import { Container, VisuallyHidden } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import Layout from '../../../components/layout'
import ProductListing from '../../../components/product-listing'
import SEO from '../../../components/seo'

const ProductTypeIndex = ({
  data: { products },
  pageContext: { productType },
}) => {
  return (
    <Layout>
      <SEO title={`Category: ${productType}`} />
      <VisuallyHidden as="h1">{productType}</VisuallyHidden>
      <Container py={20}>
        <ProductListing products={products} />
      </Container>
    </Layout>
  )
}

export default ProductTypeIndex

export const query = graphql`
  query($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: publishedAt, order: ASC }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
