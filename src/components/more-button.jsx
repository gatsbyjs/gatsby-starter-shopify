import * as React from "react"
import { moreButton } from "./more-button.module.css"
import { Link } from "gatsby"
export function MoreButton({ className, ...props }) {
  return <Link className={[className, moreButton].join(" ")} {...props} />
}
