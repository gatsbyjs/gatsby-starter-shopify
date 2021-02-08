import * as React from 'react'
import { Grid } from '@chakra-ui/react'
import ProductCard from './product-card'

const ProductListing = ({ products }) => {
  return (
    <Grid
      templateColumns={['1fr', 'repeat(2, 1fr)', null, 'repeat(3, 1fr)']}
      columnGap={6}
      rowGap={[12, 16, 20]}
    >
      {products.nodes.map((p) => (
        <ProductCard product={p} key={p.slug} />
      ))}
    </Grid>
  )
}

export default ProductListing
