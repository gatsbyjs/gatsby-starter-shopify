import * as React from 'react'
import {
  Box,
  Container,
  useColorModeValue,
  Stack,
  Badge,
  IconButton,
  Button,
  useMediaQuery,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Drawer,
  useDisclosure,
} from '@chakra-ui/react'
import { FiShoppingCart, FiMenu } from 'react-icons/fi'
import { StoreContext } from '../context/store-context'
import Logo from '../icons/logo'
import Link from './link'
import Spacer from './spacer'
import Cart from './cart'

const navigationLinks = [
  {
    name: 'All products',
    slug: '/products/',
    pActive: false,
  },
  {
    name: 'Shirts',
    slug: '/products/shirt/',
    pActive: true,
  },
  {
    name: 'Stickers',
    slug: '/products/stickers/',
    pActive: true,
  },
]

const Header = () => {
  const { isOpen, onClose, onOpen, checkout } = React.useContext(StoreContext)
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure()
  const [isSmallerThan640] = useMediaQuery('(max-width: 640px)')
  const bg = useColorModeValue(`white`, `gray.900`)
  const logoColor = useColorModeValue(`blue.600`, `blue.400`)
  const linkColor = useColorModeValue(`black`, `white`)
  const btnRef = React.useRef()
  const menuRef = React.useRef()

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
            <>
              <Drawer
                isOpen={isOpenMenu}
                placement="right"
                onClose={onCloseMenu}
                finalFocusRef={menuRef}
                size="md"
              >
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                      <Stack
                        as="nav"
                        direction="column"
                        fontSize="lg"
                        alignItems="center"
                        sx={{
                          'a.active': {
                            fontWeight: `medium`,
                            color: linkColor,
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          alignItems="center"
                          spacing={3}
                        >
                          <Button
                            aria-label={`Shopping Cart with ${quantity} items`}
                            rightIcon={<FiShoppingCart />}
                            variant="ghost"
                            ref={btnRef}
                            onClick={onOpen}
                          >
                            Cart
                          </Button>{' '}
                          <Badge
                            height="24px"
                            width="24px"
                            borderRadius="full"
                            p={0}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            colorScheme="blue"
                          >
                            {quantity}
                          </Badge>
                        </Stack>
                        {navigationLinks.map((n) => (
                          <Link
                            key={n.slug}
                            p={2}
                            to={n.slug}
                            activeClassName="active"
                            partiallyActive={n.pActive}
                          >
                            {n.name}
                          </Link>
                        ))}
                      </Stack>
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Button
                onClick={onOpenMenu}
                ref={menuRef}
                px={3}
                size="sm"
                aria-label={isOpenMenu ? `Close menu` : `Open menu`}
                justifySelf="flex-end"
                rightIcon={<FiMenu />}
              >
                Menu
              </Button>
            </>
          ) : (
            <>
              <Stack
                as="nav"
                direction="row"
                fontSize="lg"
                alignItems="center"
                sx={{ 'a.active': { fontWeight: `medium`, color: linkColor } }}
              >
                {navigationLinks.map((n) => (
                  <Link
                    key={n.slug}
                    p={2}
                    to={n.slug}
                    activeClassName="active"
                    partiallyActive={n.pActive}
                  >
                    {n.name}
                  </Link>
                ))}
              </Stack>
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
                  colorScheme="blue"
                >
                  {quantity}
                </Badge>
              </Stack>
            </>
          )}
        </Container>
      </Box>
      <Spacer size="navigationHeight" axis="vertical" />
    </>
  )
}

export default Header
