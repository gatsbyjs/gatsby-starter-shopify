<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Starter Shopify
</h1>

Kick off your next [Shopify](https://www.shopify.com/) project with this boilerplate. This starter creates a store with a custom landing page, individual filtered views for each product, detailed product pages, advanced instant search and a shopping cart. All styled with CSS Modules.

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.png" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify)

Check out the [demo site](https://shopify-demo.gatsbyjs.com) showcasing a proof-of-concept with 10k products and 30k variants.

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the Shopify starter.

    ```shell
    # create a new Gatsby site using the Shopify starter
    npx gatsby new my-shopify-store https://github.com/gatsbyjs/gatsby-starter-shopify
    ```

2.  **Link to your store**

    Follow these instructions here to [link your Shopify store](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-shopify#readme). Create a `.env` file with your Shopify store URL, password, and Storefront access token, using the `.env.example` file as an example. If you want to try with a development store, see [the sample data and instructions here](example/).

3.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-shopify-starter/
    npm start
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `my-shopify-starter` directory in your code editor of choice and edit `src/pages/index.jsx`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── example
    ├── src
    ├── static
    ├── .env.example
    ├── gatsby-browser.js
    ├── gatsby-config.js
    └── gatsby-node.js

1. **`/example`**: This directory includes a CSV file containing sample data to import into a development store. There are also instructions on generating your own sample data, and a link to a dataset with 30,000 SKUs.

2. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3. **`/static`**: Every file in this directory will be copied over to the `public` folder during the build. Learn more about [using the `static` folder](https://www.gatsbyjs.com/docs/how-to/images-and-media/static-folder/). In this project it holds the `og:image` and favicons.

4. **`/.env.example`**: Duplicate this file, rename it to `.env`, and fill out the keys. You'll need to define those environment variables to get the source plugin, cart and search working.

5. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser. In this project it wraps the whole application with the context provider of the store/shopping cart.

6. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process. In this project it adds a custom Babel plugin to Gatsby.

### Detailed look into `src`

The whole logic for how the site looks and behaves is inside `src`.

    .
    ├── components
    ├── context
    ├── icons
    ├── images
    ├── pages
    ├── styles
    └── utils

1.  **`/components`**: Contains the React components used for building out the pages.

2.  **`/context`**: Contains the store context (e.g. adding/deleting/updating items in shopping cart, accessing Shopify), and the urql context used for search using Shopify's Storefront API.

3.  **`/icons`**: Contains all custom SVG icons and the logo.

4.  **`/pages`**: Contains the homepage and all automatically generated pages for each product category and individual product pages. The [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) is used to create those pages from your Shopify data.

5.  **`/styles`**: Contains globals styles. These are `variables.css`, used to define shared CSS custom properties, `reset.css`, which contains a CSS reset based on Chakra, and `global.css`, which includes a tiny set of global styles.

6.  **`/utils`**: Utility functions, e.g. formatting the price correctly, plus custom hooks used for handling search and pagination.

### 🎨 Styling

The site uses [CSS Modules](https://github.com/css-modules/css-modules) for styling, which allows you to use regular CSS, scoped to the individual component. Theme values such as fonts, colors and spacing are set in `src/styles/variables.css`.

### SSR Search Page

The `/search` page uses server-side rendering to show a list of products based on filters and search terms in the URL query parameters.


## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[Build, Deploy, and Host On The Only Cloud Built For Gatsby](https://www.gatsbyjs.com/cloud/)

Gatsby Cloud is an end-to-end cloud platform specifically built for the Gatsby framework that combines a modern developer experience with an optimized, global edge network.
