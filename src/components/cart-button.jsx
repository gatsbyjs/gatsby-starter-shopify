import * as React from 'react'
import { Badge, IconButton, Stack } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { ChakraHelpersContext } from '../context/chakra-helpers-context'

const CartButton = ({ quantity, btnRef, onOpen }) => {
  const { primaryColorScheme } = React.useContext(ChakraHelpersContext)

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={3}
    >
      <IconButton
        aria-label={`Shopping Cart with ${quantity} items`}
        icon={<FiShoppingCart />}
        variant="ghost"
        ref={btnRef}
        onClick={onOpen}
      />{' '}
      <Badge
        height="24px"
        width="24px"
        borderRadius="full"
        p={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        colorScheme={primaryColorScheme}
      >
        {quantity}
      </Badge>
    </Stack>
  )
}

export default CartButton
