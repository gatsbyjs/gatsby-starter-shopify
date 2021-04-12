import * as React from 'react'
import { Link } from 'gatsby'
import { footerStyle } from './footer.module.css'

const Footer = () => {
  return (
    <footer className={footerStyle}>
      <div>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved ·{' '}
        <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
          Source Code
        </a>
      </div>
    </footer>
  )
}

export default Footer
