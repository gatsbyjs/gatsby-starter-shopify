import * as React from 'react'
import {
  container,
  intro,
  callOut,
  productGrid,
  productImageStyle,
  productCardStyle,
  productDetailsStyle,
  productHeadingStyle,
} from './index.module.css'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { formatPrice } from '../utils/format-price'

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        id
        title
        slug: gatsbyPath(
          filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
        )
        description
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          altText
          gatsbyImageData(aspectRatio: 1, width: 640)
        }
      }
    }
  }
`
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <main id="#main">
        <div className={container}>
          <p className={intro}>
            10k products and 25k variants. Shopify, Gatsby, Gatsby Cloud.
            Instantly preview content, build in seconds.
          </p>
          <p className={callOut}>
            Gatsby E-Commerce Starter Kit — PoC in a day,{' '}
            <strong>with your own products </strong>
          </p>
        </div>

        <div className={productGrid}>
          {data.shopifyCollection.products.map((product, idx) => (
            <Link
              to={product.slug}
              className={productCardStyle}
              key={product.id}
            >
              <div className={productImageStyle} data-name="product-image-box">
                <GatsbyImage
                  image={product.images[0].gatsbyImageData}
                  alt={product.images[0].altText ?? product.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <div key={product.title}>
                <div className={productDetailsStyle}>
                  <h2 className={productHeadingStyle}>{product.title}</h2>
                  <span>
                    {formatPrice(
                      product.priceRangeV2.maxVariantPrice.currencyCode,
                      product.priceRangeV2.maxVariantPrice.amount
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage
