import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import { ProductListing } from "../components/product-listing"
import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
} from "./index.module.css"

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
      <div className={container}>
        <h1 className={intro}>Welcome to the GatsbyJS + Shopify Demo Store.</h1>
        <p className={callOut}>
          It's a proof-of-concept in a box, with 10k products and 30k variants
          to help you get to proof-of-concept as soon as right now.
        </p>
        <p className={callToAction}>
          Hook it up to your own Shopify store data and start customizing in
          minutes by deploying it to Gatsby Cloud for free. Grab your Shopify
          store credentials and
          <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
            <img
              src="https://www.gatsbyjs.com/deploynow.png"
              alt="Deploy to Gatsby Cloud"
              className={deployButton}
            />
          </a>
        </p>
      </div>
      <ProductListing products={data.shopifyCollection.products} />
    </Layout>
  )
}
