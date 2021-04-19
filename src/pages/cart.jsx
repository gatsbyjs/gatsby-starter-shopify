// @ts-check
import * as React from 'react'
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
} from './cart.module.css'

import Layout from '../components/layout'
import { StoreContext } from '../context/store-context'
import LineItem from '../components/line-item'
import { formatPrice } from '../utils/format-price'

const CartPage = () => {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0
  const isDemoStore = process.env.GATSBY_DEMO_STORE

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout>
      <main className={wrap}>
        {emptyCart ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <table className={table}>
              <thead>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th>Qty.</th>
                <th className={totals}>Total</th>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={summary}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Subtotal</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Taxes</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Shipping</td>
                  <td className={totals}>Calculated at checkout</td>
                </tr>
                <tr className={grandTotal}>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>Total Price</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              Checkout
            </button>
          </>
        )}
      </main>
    </Layout>
  )
}

export default CartPage
