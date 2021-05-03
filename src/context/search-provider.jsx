import * as React from "react"
import { createClient, Provider as UrlqProvider } from "urql"

const urqlClient = createClient({
  url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2021-01/graphql.json`,
  fetchOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    },
  },
})

export function SearchProvider({ children }) {
  return <UrlqProvider value={urqlClient}>{children}</UrlqProvider>
}
