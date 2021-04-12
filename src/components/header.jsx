import * as React from 'react'
import {
  headerStyle,
  headerSectionStyle,
  containerStyle,
  logoSpan,
  spacer,
} from './header.module.css'
import { Link } from 'gatsby'
import { StoreContext } from '../context/store-context'
import Logo from '../icons/logo'
import Cart from './cart'
import Navigation from './navigation'
import CartButton from './cart-button'
import { CgSearch } from 'react-icons/cg'

const Header = () => {
  const { isOpen, onClose, onOpen, checkout } = React.useContext(StoreContext)
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
          <div className={headerSectionStyle}>
            <Link to="/" className={logoSpan}>
              <Logo />
            </Link>
            <Navigation />
          </div>
          <div className={headerSectionStyle}>
            <Link to="/search">
              <CgSearch size={24} title="Search" />
            </Link>
            <CartButton quantity={quantity} onOpen={onOpen} btnRef={btnRef} />
          </div>
        </header>
      </main>
      <span className={spacer}> </span>
    </div>
  )
}

export default Header
