import { graphql, useStaticQuery, Link } from 'gatsby'
import * as React from 'react'
import { navStyle, Linkstyle } from './navigation.module.css'
import slugify from '@sindresorhus/slugify'

export function Navigation({ className }) {
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
    <nav className={[navStyle, className].join(' ')}>
      <Link
        key="All"
        className={Linkstyle}
        to={`/search`}
        activeClassName="active"
      >
        All products
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          className={Linkstyle}
          to={`/products/${slugify(name)}`}
          activeClassName="active"
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
