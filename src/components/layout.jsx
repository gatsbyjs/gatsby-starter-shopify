import * as React from 'react'
import { SkipNavContent, SkipNavLink } from './skip-nav'
import Header from './header'
import Footer from './footer'
import SEO from './seo'
import { ChakraHelpersProvider } from '../context/chakra-helpers-context'

const Layout = ({ children }) => (
  <ChakraHelpersProvider>
    <SEO />
    <SkipNavLink />
    <Header />
    <SkipNavContent>{children}</SkipNavContent>
    <Footer />
  </ChakraHelpersProvider>
)

export default Layout
