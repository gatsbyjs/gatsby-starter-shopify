import * as React from 'react'
import {
  headerStyle,
  containerStyle,
  logoSpan,
  title,
} from './header.module.css'
import { useMediaQuery } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { StoreContext } from '../context/store-context'
import Logo from '../icons/logo'
import Spacer from './spacer'
import Cart from './cart'
import Navigation from './navigation'
import MobileMenu from './mobile-menu'
import CartButton from './cart-button'

const Header = () => {
  const { isOpen, onClose, onOpen, checkout } = React.useContext(StoreContext)
  const [isSmallerThan640] = useMediaQuery('(max-width: 640px)')
  const btnRef = React.useRef()

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div>
      <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <main className={containerStyle}>
        <header className={headerStyle}>
          <Link to="/" className={logoSpan}>
            <Logo /> <div className={title}>Hexagon</div>
          </Link>
          {isSmallerThan640 ? (
            <MobileMenu quantity={quantity} btnRef={btnRef} onOpen={onOpen} />
          ) : (
            <>
              <Navigation />
              <CartButton quantity={quantity} onOpen={onOpen} btnRef={btnRef} />
            </>
          )}
        </header>
      </main>
      <span> </span>
      <Spacer size="navigationHeight" axis="vertical" />
    </div>
  )
}

export default Header
