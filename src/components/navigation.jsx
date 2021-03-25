import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import Link from './link'
import { navStyle } from './navigation.module.css'
import slugify from '@sindresorhus/slugify'
// In theory this could also be defined inside "gatsby-config.js" and then queried via GraphQL

const Navigation = () => {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `)

  return (
    <div
      className={navStyle}
      as="nav"
      direction={['column', 'row']}
      fontSize="lg"
      alignItems="center"
      sx={{ 'a.active': { fontWeight: `medium` } }}
    >
      <Link p={2} to="/products/" activeClassName="active">
        All Products
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          p={2}
          to={`/products/${slugify(name)}`}
          activeClassName="active"
        >
          {name}
        </Link>
      ))}
    </div>
  )
}

export default Navigation
