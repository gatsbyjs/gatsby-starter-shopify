import * as React from "react"
import { Layout } from "../components/layout"
import { heading, paragraph, container } from "./404.module.css"
import { Seo } from "../components/seo"

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={container}>
        <h1 className={heading}>Page Not Found</h1>
        <p className={paragraph}>
          Sorry, we couldn't find what you were looking for
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />
