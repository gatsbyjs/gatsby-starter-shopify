import * as React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiArrowRight as ArrowIcon } from 'react-icons/fi'
import { StoreContext } from '../context/store-context'
import LineItem from './line-item'
import Spacer from './spacer'
import formatPrice from '../utils/format-price'
import { ChakraHelpersContext } from '../context/chakra-helpers-context'

const TableHeading = ({ children, ...rest }) => (
  <Box fontSize="18px" fontWeight="medium" {...rest}>
    {children}
  </Box>
)

const CalcText = ({ children, ...rest }) => (
  <Box
    textTransform="uppercase"
    letterSpacing="wider"
    fontWeight="medium"
    {...rest}
  >
    {children}
  </Box>
)

const Cart = ({ isOpen, onClose, btnRef }) => {
  const { checkout, loading } = React.useContext(StoreContext)
  const { primaryColorScheme } = React.useContext(ChakraHelpersContext)
  const emptyCart = checkout.lineItems.length === 0
  const priceColor = useColorModeValue(`primary`, `dark.primary`)
  const isDemoStore = process.env.GATSBY_DEMO_STORE

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {emptyCart ? (
              <Text textAlign="center" fontSize="18px">
                Your cart is empty
              </Text>
            ) : (
              <>
                <Grid templateColumns="1fr 70px 70px" gap={6}>
                  <TableHeading>Product</TableHeading>
                  <TableHeading>Qty.</TableHeading>
                  <TableHeading textAlign="right">Remove</TableHeading>
                  <Divider as={GridItem} colSpan="3" />
                  {checkout.lineItems.map((item) => (
                    <LineItem item={item} key={item.id} />
                  ))}
                </Grid>
                <Divider my={6} />
                <Grid templateColumns="auto 150px" textAlign="right">
                  <CalcText>Subtotal:</CalcText>
                  <div>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </div>
                  <CalcText>Taxes:</CalcText>
                  <div>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </div>
                  <CalcText>Shipping:</CalcText>
                  <div>Free</div>
                  <Divider as={GridItem} my={6} colSpan="2" />
                  <CalcText
                    color={priceColor}
                    fontSize="18px"
                    fontWeight="bold"
                  >
                    Total Price:
                  </CalcText>
                  <Box fontSize="18px" fontWeight="bold">
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </Box>
                  <Spacer as={GridItem} colSpan="2" axis="vertical" size={6} />
                  {isDemoStore ? (
                    <Button
                      gridColumn="span 2/span 2"
                      colorScheme={primaryColorScheme}
                      disabled={true}
                    >
                      Demo Store - Checkout Disabled
                    </Button>
                  ) : (
                    <Button
                      gridColumn="span 2/span 2"
                      colorScheme={primaryColorScheme}
                      onClick={handleCheckout}
                      disabled={loading}
                      rightIcon={<ArrowIcon />}
                    >
                      Checkout
                    </Button>
                  )}
                </Grid>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Cart
