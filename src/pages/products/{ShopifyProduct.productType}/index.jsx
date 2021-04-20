import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../../components/layout"
import { visuallyHidden } from "./product-page.module.css"
import { ProductListing } from "../../../components/product-listing"
import { Seo } from "../../../components/seo"

export default function ProductTypeIndex({
  data: { products },
  pageContext: { productType },
}) {
  return (
    <Layout>
      <Seo title={`Category: ${productType}`} />
      <h1 className={visuallyHidden}>{productType}</h1>
      <div>
        <ProductListing products={products} />
      </div>
    </Layout>
  )
}

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
