import * as React from "react"
import { Layout } from "../components/layout"
import { heading, paragraph, container } from "./404.module.css"

export default function NotFoundPage() {
  return (
    <Layout>
      <main className={container}>
        <h2 className={heading}>Page Not Found</h2>
        <p className={paragraph}>
          Sorry, we couldn't find what you were looking for
        </p>
      </main>
    </Layout>
  )
}
