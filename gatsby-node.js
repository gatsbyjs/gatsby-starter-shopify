const slugify = require("@sindresorhus/slugify")

/**
 * @type {import('gatsby').GatsbyNode["createPages"]}
 */
exports.createPages = async function createPages({ actions, graphql }) {
  const result = await graphql(`
    {
      allShopifyProduct {
        nodes {
          handle
          productType
          id
        }
      }
    }
  `)

  result.data.allShopifyProduct.nodes.forEach((node) => {
    actions.createPage({
      path: `/products/${slugify(node.productType)}/${slugify(node.handle)}`,
      component: require.resolve("./src/templates/product-template.jsx"),
      context: {
        id: node.id,
        productType: node.productType,
      },
    })
  })
}
