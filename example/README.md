# Shopify sample data

This folder includes sample products that you can use with your development store.

## Using this data

1. **Create your development store**

   Follow [the instructions on the Shopify site](https://help.shopify.com/en/partners/dashboard/managing-stores/development-stores) to create a new development store.

2. **Import the products**

   In your development store, navigate to "Products", and then click "Import" in the top right of the page. Choose the sample `products.csv` file, then click "Upload and continue". For a files with small number of products, such as `products.csv` in this folder, the import process should just take a few moments. However if you are using a larger dataset, such as the 30000 SKU file, then it may take several hours to import. You can safely close the window or navigate away, and you will be notified via email when the import is complete.

## More data

If you need to test your site at scale, there is [another dataset available with 30,000 SKUs](https://github.com/gatsby-inc/shopify-csv-generator/tree/main/examples). Bear in mind that it takes several hours to import into a development site, and a cold build of the Gatbsy site will take over 10 minutes. Generally we would recommend doing your development with a site that has around 100-500 SKUs.

## Creating your own sample data

The script to generate the sample data [is available on GitHub](https://github.com/gatsby-inc/shopify-csv-generator), and you can use it to generate any number of products.

## Demo sites

You can see example sites that use this data:

- [100 SKUs (this data)](https://shopify100.gatsbyjs.io/)
- [30 000 SKUs](https://shopify30k.gatsbyjs.io/)

## Credit

The images used in these datasets are randomly selected via [Unsplash](https://source.unsplash.com/) and are copyright the individual photographers.

The rest of the data is randomly-generated and free to use for any purpose.
