import * as React from "react"
import {
  footerStyle,
  copyright,
  links,
  blurb,
  logos,
} from "./footer.module.css"
import Logo from "../icons/logo"

export function Footer() {
  return (
    <footer className={footerStyle}>
      <div className={blurb}>
        <div className={logos}>
          <Logo />
        </div>
        <strong>gatsby-starter-shopify</strong> change this by editing{" "}
        <code>src/components/footer.jsx</code>
      </div>
      <nav className={links} aria-label="footer">
        <ul>
          <li>
            <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
              Source Code and Docs
            </a>
          </li>
          <li>
            <a href="https://www.gatsbyjs.com/cloud/">About Gatsby Cloud</a>
          </li>
          {process.env.GATSBY_DEMO_STORE === "true" && (
            <li>
              <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify">
                <img
                  src="https://www.gatsbyjs.com/deploynow.png"
                  alt="Deploy to Gatsby Cloud"
                  height="38"
                  width="251"
                />
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className={copyright}>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  )
}
