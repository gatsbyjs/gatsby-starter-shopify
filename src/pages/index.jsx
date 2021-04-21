import * as React from "react"
import { container, intro, callOut } from "./index.module.css"
import { Layout } from "../components/layout"
import { graphql } from "gatsby"
import { ProductListing } from "../components/product-listing"

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`
export default function IndexPage({ data }) {
  return (
    <Layout>
      <main id="#main">
        <div className={container}>
          <p className={intro}>
            10k products and 25k variants.Shopify, Gatsby, Gatsby Cloud.
            Instantly preview content, build in seconds.
          </p>
          <p className={callOut}>
            Gatsby E-Commerce Starter Kit — PoC in a day,{" "}
            <strong>with your own products </strong>
          </p>
        </div>
        <ProductListing products={data.shopifyCollection.products} />
      </main>
    </Layout>
  )
}
