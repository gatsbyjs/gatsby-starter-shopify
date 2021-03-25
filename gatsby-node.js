// @ts-check
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-react-icons`,
    options: {},
  })
}
