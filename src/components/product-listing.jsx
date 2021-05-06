import * as React from "react"
import { ProductCard } from "./product-card"
import { listingContainerStyle } from "./product-listing.module.css"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
export function ProductListing({ products }) {
  return (
    <div className={listingContainerStyle}>
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} eager={index === 0} />
      ))}
    </div>
  )
}
