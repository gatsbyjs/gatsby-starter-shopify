import * as React from 'react'
import ProductCard from './product-card'
import { listingContainerStyle } from './product-listing.module.css'

const ProductListing = ({ products }) => {
  return (
    <div className={listingContainerStyle}>
      {products.nodes.map((p) => (
        <ProductCard product={p} key={p.slug} />
      ))}
    </div>
  )
}

export default ProductListing
