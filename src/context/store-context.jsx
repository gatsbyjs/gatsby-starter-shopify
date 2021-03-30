import fetch from 'isomorphic-fetch'
import * as React from 'react'
import Client from 'shopify-buy'
import { useDisclosure } from '@chakra-ui/react'

import { createClient, Provider as UrlqProvider } from 'urql'

const urqlClient = createClient({
  url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2021-01/graphql.json`,
  fetchOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    },
  },
})

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = React.createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [checkout, setCheckout] = React.useState(defaultValues.checkout)
  const [loading, setLoading] = React.useState(false)

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true)
    console.log(variantId)
    console.log({ quantity })

    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true)

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  return (
    <UrlqProvider value={urqlClient}>
      <StoreContext.Provider
        value={{
          ...defaultValues,
          addVariantToCart,
          removeLineItem,
          updateLineItem,
          checkout,
          loading,
          isOpen,
          onOpen,
          onClose,
        }}
      >
        {children}
      </StoreContext.Provider>
    </UrlqProvider>
  )
}
