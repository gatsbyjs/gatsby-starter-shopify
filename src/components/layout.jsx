import * as React from 'react'
import { SkipNavContent, SkipNavLink } from './skip-nav'
import Header from './header'
import Footer from './footer'
import SEO from './seo'

const Layout = ({ children }) => (
  <div>
    <SEO />
    <SkipNavLink />
    <Header />
    <SkipNavContent>{children}</SkipNavContent>
    <Footer />
  </div>
)

export default Layout
