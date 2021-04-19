require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteTitle: 'gatsby-starter-shopify',
    siteTitleDefault: 'gatsby-starter-shopify by @GatsbyJS',
    siteUrl: 'https://gatsbystartershopify.gatsbyjs.io',
    hrefLang: 'en',
    siteDescription:
      'A Gatsby starter using the latest Shopify plugin showcasing a store with product overview, individual product pages, and a cart.',
    siteImage: '/default-og-image.jpg',
    twitter: '@gatsbyjs',
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
        password: process.env.SHOPIFY_ADMIN_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    '@chakra-ui/gatsby-plugin',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-gatsby-cloud',
  ],
}
