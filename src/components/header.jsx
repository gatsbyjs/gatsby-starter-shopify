import * as React from "react"
import {
  headerStyle,
  containerStyle,
  logoSpan,
  searchButton,
  cartButton,
  navSection,
} from "./header.module.css"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import logo from "../icons/logo.svg"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import { CgSearch } from "react-icons/cg"

export function Header() {
  const { checkout, loading } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className={containerStyle}>
      <header className={headerStyle}>
        <Link to="/" className={logoSpan}>
          <img src={logo} width={24} height={24} alt="My store" />
        </Link>
        <Navigation className={navSection} />
        <Link to="/search" className={searchButton}>
          <CgSearch size={24} title="Search" />
        </Link>
        <CartButton
          quantity={quantity}
          className={cartButton}
          loading={loading}
        />
      </header>
    </div>
  )
}
