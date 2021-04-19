import * as React from 'react'
import { cartButtonContainerStyle, badgeStyle } from './cart-button.module.css'
import { CgShoppingBag } from 'react-icons/cg'
import { Link } from 'gatsby'

const CartButton = ({ quantity, btnRef, onOpen }) => {
  return (
    <div className={cartButtonContainerStyle}>
      <Link aria-label={`Shopping Cart with ${quantity} items`} to="/cart">
        <CgShoppingBag size={24} />
      </Link>
      <div className={badgeStyle}>{quantity}</div>
    </div>
  )
}

export default CartButton
