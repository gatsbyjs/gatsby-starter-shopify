import * as React from "react"
import { ProductCard } from "./product-card"
import { listingContainerStyle } from "./product-listing.module.css"

export function ProductListing({ products }) {
  return (
    <div className={listingContainerStyle}>
      {products.nodes.map((p) => (
        <ProductCard product={p} key={p.slug} />
      ))}
    </div>
  )
}
