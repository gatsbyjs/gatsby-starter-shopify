import * as React from "react"
import { Link } from "gatsby"
import { moreButton } from "./more-button.module.css"

export function MoreButton({ className, ...props }) {
  return <Link className={[className, moreButton].join(" ")} {...props} />
}
