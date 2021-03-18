import * as React from 'react'
import Link from './link'
import { footerStyle } from './footer.module.css'

const Footer = () => {
  return (
    <footer className={footerStyle}>
      <div>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved ·{' '}
        <Link href="https://github.com/gatsbyjs/gatsby-starter-shopify">
          Source Code
        </Link>
      </div>
    </footer>
  )
}

export default Footer
