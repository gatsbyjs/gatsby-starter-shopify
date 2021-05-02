import * as React from "react"
import { cartButton, badge } from "./cart-button.module.css"
import CartIcon from "../icons/cart"
import { Link } from "gatsby"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  )
}
