import * as React from 'react'
import { Button } from '@chakra-ui/react'
import { StoreContext } from '../context/store-context'

const AddToCart = ({ variantId, quantity, available, ...props }) => {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  return (
    <Button
      colorScheme="blue"
      onClick={() => addVariantToCart(variantId, quantity)}
      disabled={!available || loading}
      {...props}
    >
      {available ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  )
}

export default AddToCart
