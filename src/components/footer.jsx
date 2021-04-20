import * as React from "react"
import {
  footerStyle,
  copyright,
  links,
  blurb,
  logos,
} from "./footer.module.css"
import logo from "../icons/logo.svg"

export function Footer() {
  return (
    <footer className={footerStyle}>
      <div className={blurb}>
        <div className={logos}>
          <img src={logo} width={24} height={24} alt="My store" />
          <img src={logo} width={24} height={24} alt="My store" />
        </div>
        <strong>gatsby-starter-shopify</strong> change this by editing{" "}
        <code>src/components/footer.jsx</code>
      </div>
      <nav className={links}>
        <ul>
          <li>
            <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
              Source Code and Docs
            </a>
          </li>
          <li>
            <a href="">Deploy to Gatsby Cloud</a>
          </li>
          <li>
            <a href="https://www.gatsbyjs.com/cloud/">About Gatsby Cloud</a>
          </li>
        </ul>
      </nav>
      <div className={copyright}>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  )
}
