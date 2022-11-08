import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../components/layout"
import { ProductListing } from "../../components/product-listing"
import { Seo } from "../../components/seo"
import { MoreButton } from "../../components/more-button"
import { title } from "./index.module.css"

export default function Products({ data: { products } }) {
  return (
    <Layout>
      <h1 className={title}>Products</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="All Products" />

export const query = graphql`
  {
    products: allShopifyProduct(sort: { publishedAt: ASC }, limit: 24) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
