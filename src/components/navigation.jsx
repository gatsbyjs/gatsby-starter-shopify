import { graphql, useStaticQuery, Link } from 'gatsby'
import * as React from 'react'
import { navStyle, styleLink } from './navigation.module.css'
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
    <nav
      className={navStyle}
      direction={['column', 'row']}
      fontSize="lg"
      sx={{ 'a.active': { fontWeight: `medium` } }}
    >
      <Link className={styleLink} to="/products/" activeClassName="active">
        All Products
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          className={styleLink}
          to={`/products/${slugify(name)}`}
          activeClassName="active"
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
