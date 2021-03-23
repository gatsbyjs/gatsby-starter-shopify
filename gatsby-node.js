// @ts-check
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-react-icons`,
    options: {},
  })
}

exports.unstable_shouldOnCreateNode = ({ node }) =>
  node.internal.type === `ShopifyProduct`

function createOrphanNode({
  createNode,
  createContentDigest,
  getNode,
  type,
  value,
  createNodeId,
}) {
  const id = createNodeId(`${type}-${value}`)

  if (getNode(id)) {
    return
  }
  const node = {
    id,
    name: value,
    internal: {
      type,
      contentDigest: createContentDigest(value),
    },
  }
  createNode(node)
}

exports.onCreateNode = ({
  node,
  actions,
  createContentDigest,
  getNode,
  createNodeId,
}) => {
  const { createNode } = actions
  if (node.vendor) {
    createOrphanNode({
      type: 'ShopifyVendor',
      value: node.vendor,
      createNode,
      createContentDigest,
      createNodeId,
      getNode,
    })
  }

  if (node.productType) {
    createOrphanNode({
      type: 'ShopifyProductType',
      value: node.productType,
      createNode,
      createContentDigest,
      createNodeId,
      getNode,
    })
  }

  node.tags?.forEach((tag) =>
    createOrphanNode({
      type: 'ShopifyTag',
      value: tag,
      createNode,
      createContentDigest,
      createNodeId,
      getNode,
    })
  )
}
