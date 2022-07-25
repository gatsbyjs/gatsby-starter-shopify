import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../../components/layout"
import { ProductListing } from "../../../components/product-listing"
import { Seo } from "../../../components/seo"
import slugify from "@sindresorhus/slugify"
import { MoreButton } from "../../../components/more-button"
import { title } from "../index.module.css"

export default function Products({
  data: { products },
  pageContext: { vendor },
}) {
  return (
    <Layout>
      <h1 className={title}>{vendor}</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search?v=${slugify(vendor)}#more`}>
          More Products
        </MoreButton>
      )}
    </Layout>
  )
}

export const Head = ({ pageContext: { vendor } }) => {
  return (
    <Seo title={`${vendor} products`} />
  )
}

export const query = graphql`
  query($vendor: String!) {
    products: allShopifyProduct(
      filter: { vendor: { eq: $vendor } }
      sort: { fields: publishedAt, order: DESC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
