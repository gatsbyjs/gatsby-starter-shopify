import * as React from "react"
import {
  cartButtonContainerStyle,
  badgeStyle,
  linkStyle,
} from "./cart-button.module.css"
import { CgShoppingBag } from "react-icons/cg"
import { Link } from "gatsby"

export function CartButton({ quantity, className }) {
  return (
    <div className={[cartButtonContainerStyle, className].join(" ")}>
      <Link
        aria-label={`Shopping Cart with ${quantity} items`}
        to="/cart"
        className={linkStyle}
      >
        <CgShoppingBag size={24} />
      </Link>
      <div className={badgeStyle}>{quantity}</div>
    </div>
  )
}
