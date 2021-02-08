import * as React from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import Navigation from './navigation'
import CartButton from './cart-button'

const MobileMenu = ({ quantity, btnRef, onOpen }) => {
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure()
  const menuRef = React.useRef()
  const linkColor = useColorModeValue(`headingColor`, `dark.headingColor`)

  return (
    <>
      <Drawer
        isOpen={isOpenMenu}
        placement="right"
        onClose={onCloseMenu}
        finalFocusRef={menuRef}
        size="full"
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
                <CartButton
                  quantity={quantity}
                  onOpen={onOpen}
                  btnRef={btnRef}
                />
                <Navigation />
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
  )
}

export default MobileMenu
