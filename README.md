<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Starter Shopify
</h1>

Kick off your next [Shopify](https://www.shopify.com/) project with this boilerplate. This starter creates a store with a custom landing page, individual filtered views for each product, detailed product pages, and a shopping cart. All styled with [Chakra UI](https://chakra-ui.com/) including support for dark mode.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the Shopify starter.

    ```shell
    # create a new Gatsby site using the Shopify starter
    gatsby new my-shopify-starter https://github.com/gatsbyjs/gatsby-starter-shopify
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-shopify-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `my-shopify-starter` directory in your code editor of choice and edit `src/pages/index.jsx`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── src
    ├── static
    ├── .env.example
    ├── gatsby-browser.js
    ├── gatsby-config.js
    └── gatsby-node.js

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`/static`**: Every file in this directory will be copied over to the `public` folder during the build. Learn more about [using the `static` folder](https://www.gatsbyjs.com/docs/how-to/images-and-media/static-folder/). In this project it holds the `og:image` and favicons.

1.  **`/.env.example`**: Duplicate this file, rename it to `.env`, and fill out the keys. You'll need to define those environment variables to get the source plugin and `shopify-buy` client on the frontend working.

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser. In this project it wraps the whole application with the context provider of the store/shopping cart.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process. In this project it adds a custom Babel plugin to Gatsby.

### Detailed look into `src`

The whole logic for how the site looks and behaves is inside `src`.

    .
    ├── @chakra-ui/gatsby-plugin/theme
    ├── components
    ├── context
    ├── icons
    ├── images
    ├── pages
    └── utils

1.  **`/@chakra-ui/gatsby-plugin/theme`**: [Chakra UI](https://chakra-ui.com/) is used for styling the page. It exposes themeable pre-built components that can be customized to your liking. The structure for customizing the theme is explained in the [Customize Theme](https://chakra-ui.com/docs/theming/customize-theme) document in their documentation (see ["Scaling out your project"](https://chakra-ui.com/docs/theming/customize-theme#scaling-out-your-project)).

1.  **`/components`**: Contains the React components used for building out the pages.

1.  **`/context`**: Contains the store context (e.g. adding/deleting/updating items in shopping cart, accessing Shopify), and a Chakra UI helpers context (contains theme tokens that Chakra UI currently doesn't interpret correctly).

1.  **`/icons`**: Contains the SVG logo.

1.  **`/images`**: Contains the images used on the homepage (used with `<StaticImage />` component from `gatsby-plugin-image`).

1.  **`/pages`**: Contains the homepage and all automatically generated pages for each product category and individual product pages. The [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) is used to create those pages from your Shopify data.

1.  **`/utils`**: Utility functions, e.g. formatting the price correctly.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-shopify)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-shopify)
