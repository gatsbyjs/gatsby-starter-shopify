import * as React from 'react'
import { addToCart } from './add-to-cart.module.css'
import { StoreContext } from '../context/store-context'

const AddToCart = ({ variantId, quantity, available, ...props }) => {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  return (
    <button
      type="submit"
      className={addToCart}
      onClick={() =>
        console.log('addnig') || addVariantToCart(variantId, quantity)
      }
      disabled={!available || loading}
      {...props}
    >
      {available ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}

export default AddToCart
