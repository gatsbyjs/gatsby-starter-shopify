import * as React from 'react'
import { StoreProvider } from './src/context/store-context'
import './src/styles/variables.css'
import { createClient, Provider as UrlqProvider } from 'urql'

const client = createClient({
  url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2021-01/graphql.json`,
  fetchOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    },
  },
})

export const wrapRootElement = ({ element }) => (
  <UrlqProvider value={client}>
    <StoreProvider>{element}</StoreProvider>
  </UrlqProvider>
)
