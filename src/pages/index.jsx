import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import { ProductListing } from "../components/product-listing"
import { Seo } from "../components/seo"
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
function Hero (props) {
  return (
    <div className={container}>
      <h1 className={intro}>Gatsby Shopify Starter on Pantheon</h1>
      {!!process.env.GATSBY_DEMO_STORE && (
        <>
          <p className={callOut}>
            You can add a Gatsby Shopify starter site on Pantheon. No CMS required!
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
        </>
      )}
    </div>
  )
}

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Hero />
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  )
}

export const Head = () => <Seo />
