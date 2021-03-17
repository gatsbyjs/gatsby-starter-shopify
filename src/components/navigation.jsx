import * as React from 'react'
import Link from './link'
import { navStyle } from './navigation.module.css'

// In theory this could also be defined inside "gatsby-config.js" and then queried via GraphQL
const navigationLinks = [
  {
    name: 'All products',
    slug: '/products/',
    pActive: false,
  },
  {
    name: 'Shirts',
    slug: '/products/shirt/',
    pActive: true,
  },
  {
    name: 'Stickers',
    slug: '/products/stickers/',
    pActive: true,
  },
]

const Navigation = () => {
  return (
    <div
      className={navStyle}
      as="nav"
      direction={['column', 'row']}
      fontSize="lg"
      alignItems="center"
      sx={{ 'a.active': { fontWeight: `medium` } }}
    >
      {navigationLinks.map((n) => (
        <Link
          key={n.slug}
          p={2}
          to={n.slug}
          activeClassName="active"
          partiallyActive={n.pActive}
        >
          {n.name}
        </Link>
      ))}
    </div>
  )
}

export default Navigation
