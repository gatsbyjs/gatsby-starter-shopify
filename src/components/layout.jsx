import * as React from 'react'
import { SkipNavContent, SkipNavLink } from './skip-nav'
import Header from './header'
import Footer from './footer'
import SEO from './seo'

const Layout = ({ children }) => (
  <>
    <SEO />
    <SkipNavLink />
    <Header />
    <SkipNavContent>{children}</SkipNavContent>
    <Footer />
  </>
)

export default Layout
