import * as React from "react"
import { Layout } from "../components/layout"
import { heading, paragraph, container } from "./500.module.css"

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={container}>
        <h1 className={heading}>Server Error</h1>
        <p className={paragraph}>
          Sorry, we have an server error
        </p>
      </div>
    </Layout>
  )
}
