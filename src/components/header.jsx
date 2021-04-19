import * as React from 'react'
import {
  headerStyle,
  headerSectionStyle,
  containerStyle,
  logoSpan,
} from './header.module.css'
import { Link } from 'gatsby'
import { StoreContext } from '../context/store-context'
import logo from '../icons/logo.svg'
import Navigation from './navigation'
import CartButton from './cart-button'
import { CgSearch } from 'react-icons/cg'

const Header = () => {
  const { checkout } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div>
      <main className={containerStyle}>
        <header className={headerStyle}>
          <Link to="/" className={logoSpan}>
            <img src={logo} width={24} height={24} alt="My store" />
          </Link>
          <Navigation />
          <Link to="/search">
            <CgSearch size={24} title="Search" />
          </Link>
          <CartButton quantity={quantity} />
        </header>
      </main>
    </div>
  )
}

export default Header
