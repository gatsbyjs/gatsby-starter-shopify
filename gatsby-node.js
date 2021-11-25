const Shopify = require("@shopify/shopify-api")
const WEBHOOK_URL = process.env.WEBHOOK_URL || `http://localhost:8000/__refresh`
const INC_BUILD_LIMIT = Number(process.env.INC_BUILD_LIMIT) || 0
let buildNumber = 0

exports.onPostBuild = async () => {
  if (global.gc) {
    global.gc()
    console.log(`Running GC`)
  }
  console.log(`WEBHOOK_URL: ${WEBHOOK_URL}`)
  console.log(`INC_BUILD_LIMIT: ${INC_BUILD_LIMIT}`)
  console.log(``)

  buildNumber++
  console.log(`CURRENT BUILD: ${buildNumber}`)
  console.log(process.memoryUsage())

  if (buildNumber < INC_BUILD_LIMIT) {
    const okStatuses = [200, 204]
    const result = await triggerWebhook()
    if (!okStatuses.includes(result.status)) {
      throw new Error(`Unexpected webhook HTTP status: ${result.status}`)
    }
  } else {
    console.log(`REACHED INC_BUILD_LIMIT (${INC_BUILD_LIMIT})`)
  }
}

async function triggerWebhook() {
  console.log({
    GATSBY_SHOPIFY_STORE_URL: process.env.GATSBY_SHOPIFY_STORE_URL,
    SHOPIFY_SHOP_PASSWORD: process.env.SHOPIFY_SHOP_PASSWORD,
  })
  const client = new Shopify.default.Clients.Rest(
    process.env.GATSBY_SHOPIFY_STORE_URL,
    process.env.SHOPIFY_SHOP_PASSWORD
  )
  const productId = 7161518325960
  const newTitle = `Ergonomic Granite Shirt - ${buildNumber}`
  const data = await client.put({
    path: `products/${productId}`,
    data: {
      product: {
        id: productId,
        title: newTitle,
      },
    },
    type: Shopify.DataType.JSON,
  })

  if (data.body.product.title === newTitle) {
    console.log(`Product title updated to ${newTitle}`)

    return {
      status: 200,
    }
  } else {
    console.log(`Product title NOT updated`)

    return {
      status: 500,
    }
  }
}
