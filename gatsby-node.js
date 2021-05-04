// @ts-check
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const webpackConfig = getConfig()

  // We bundle all CSS on every page to ensure CSS specificity is always correct and
  // that our users do not have to worry about how they write CSS. With CSS modules, we know all our CSS is scoped to a page.
  // We can remove the default behavior from Gatsby to only include the used CSS.
  if (
    webpackConfig.optimization &&
    webpackConfig.optimization.splitChunks &&
    webpackConfig.optimization.splitChunks.styles
  ) {
    delete webpackConfig.optimization.splitChunks.styles

    actions.replaceWebpackConfig(webpackConfig)
  }
}
