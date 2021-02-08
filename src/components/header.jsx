import * as React from 'react'
import {
  Box,
  Container,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { StoreContext } from '../context/store-context'
import Logo from '../icons/logo'
import Link from './link'
import Spacer from './spacer'
import Cart from './cart'
import Navigation from './navigation'
import MobileMenu from './mobile-menu'
import CartButton from './cart-button'

const Header = () => {
  const { isOpen, onClose, onOpen, checkout } = React.useContext(StoreContext)
  const [isSmallerThan640] = useMediaQuery('(max-width: 640px)')
  const bg = useColorModeValue(`bg`, `dark.bg`)
  const logoColor = useColorModeValue(`primary`, `dark.primary`)
  const linkColor = useColorModeValue(`headingColor`, `dark.headingColor`)
  const btnRef = React.useRef()

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <>
      <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Box
        w="100%"
        margin={0}
        as="header"
        position="fixed"
        zIndex="docked"
        height="navigationHeight"
        display="flex"
        alignItems="center"
        bg={bg}
        sx={{ svg: { height: `24px`, width: `auto` } }}
      >
        <Container
          display="grid"
          gridTemplateColumns={['1fr 1fr', '1fr auto 1fr']}
        >
          <Link
            to="/"
            display="flex"
            alignItems="center"
            justifySelf="flex-start"
            color={linkColor}
            _hover={{
              textDecoration: `none`,
              color: logoColor,
            }}
          >
            <Logo />{' '}
            <Box ml={3} fontWeight="medium" fontSize="lg">
              Hexagon
            </Box>
          </Link>
          {isSmallerThan640 ? (
            <MobileMenu quantity={quantity} btnRef={btnRef} onOpen={onOpen} />
          ) : (
            <>
              <Navigation />
              <CartButton quantity={quantity} onOpen={onOpen} btnRef={btnRef} />
            </>
          )}
        </Container>
      </Box>
      <Spacer size="navigationHeight" axis="vertical" />
    </>
  )
}

export default Header
