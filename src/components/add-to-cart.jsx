import * as React from "react"
import { addToCart as addToCartStyle } from "./add-to-cart.module.css"
import { StoreContext } from "../context/store-context"

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type="submit"
      className={addToCartStyle}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? "Add to Cart" : "Out of Stock"}
    </button>
  )
}
