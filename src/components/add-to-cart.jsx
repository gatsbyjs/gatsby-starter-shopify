import * as React from 'react'
import { addToCart } from './add-to-cart.module.css'
import { StoreContext } from '../context/store-context'
import { ChakraHelpersContext } from '../context/chakra-helpers-context'

const AddToCart = ({ variantId, quantity, available, ...props }) => {
  const { addVariantToCart, loading } = React.useContext(StoreContext)
  const { primaryColorScheme } = React.useContext(ChakraHelpersContext)

  return (
    <button
      type="submit"
      className={addToCart}
      onClick={() => addVariantToCart(variantId, quantity)}
      disabled={!available || loading}
      {...props}
    >
      {available ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}

export default AddToCart
