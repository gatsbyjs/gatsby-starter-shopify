import * as React from 'react'
import { cartButtonContainerStyle, badgeStyle } from './cart-button.module.css'
import { CgShoppingBag } from 'react-icons/cg'

const CartButton = ({ quantity, btnRef, onOpen }) => {
  return (
    <div className={cartButtonContainerStyle}>
      <button
        aria-label={`Shopping Cart with ${quantity} items`}
        ref={btnRef}
        onClick={onOpen}
      >
        <CgShoppingBag size={24} />
      </button>
      <div className={badgeStyle}>{quantity}</div>
    </div>
  )
}

export default CartButton
