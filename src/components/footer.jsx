import * as React from 'react'
import { footerStyle } from './footer.module.css'

export function Footer() {
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
