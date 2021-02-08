import * as React from 'react'
import {
  Stack,
  Box,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { StoreContext } from '../context/store-context'
import formatPrice from '../utils/format-price'

const LineItem = ({ item }) => {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
    loading,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)
  const titleColor = useColorModeValue(`headingColor`, `dark.headingColor`)
  const bgImage = useColorModeValue(`gray.100`, `gray.500`)

  const variantImage = item.variant.image
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    item.variant.price
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (loading) {
      return
    }
    const safeValue = Math.max(value, 1)

    setQuantity(safeValue)
    debouncedUli(safeValue)
  }

  const image = variantImage ? (
    <img
      src={variantImage.src}
      alt={
        variantImage.altText
          ? variantImage.altText
          : `Product image of ${item.title}`
      }
    />
  ) : null

  return (
    <>
      <Stack direction="row" spacing={6}>
        <Box
          minWidth="65px"
          width="65px"
          bg={bgImage}
          p={1}
          alignSelf="flex-start"
        >
          {image}
        </Box>
        <Stack direction="column" spacing={2}>
          <Box fontSize="18px" fontWeight="medium" color={titleColor}>
            {item.title}
          </Box>
          <Box>
            {item.variant.title === 'Default Title'
              ? ''
              : `${item.variant.title},`}{' '}
            {price}
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start">
        <NumberInput
          onChange={(_, value) => handleQuantityChange(value)}
          value={quantity}
          aria-label="Quantity"
          defaultValue={quantity}
          min={1}
          size="sm"
          maxW="70px"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      <CloseButton
        justifySelf="center"
        alignSelf="flex-start"
        aria-label="Remove"
        onClick={handleRemove}
      />
    </>
  )
}

export default LineItem
