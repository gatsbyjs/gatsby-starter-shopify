import * as React from 'react'
import { graphql } from 'gatsby'
import {
  productBox,
  container,
  header,
  productImageWrapper,
  productImage,
  scrollForMore,
  noImagePreview,
  infodiv,
  priceingdiv,
  priceValue,
} from './product-page.module.css'
import {
  Stack,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react'
import isEqual from 'lodash.isequal'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import Layout from '../../../components/layout'
import { StoreContext } from '../../../context/store-context'
import AddToCart from '../../../components/add-to-cart'
import formatPrice from '../../../utils/format-price'
import SEO from '../../../components/seo'

const Product = ({ data: { product, suggestions } }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product
  const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === '') {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const bgInput = useColorModeValue(`white`, `gray.800`)
  const priceColor = useColorModeValue(`primary`, `dark.primary`)

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = images.length > 1

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={getSrc(firstImage.gatsbyImageData)}
      />
      <main>
        <div className={container}>
          <div className={productBox}>
            {hasImages && (
              <div className={productImageWrapper}>
                <div
                  role="group"
                  aria-label="gallery"
                  aria-describedby="instructions"
                  className={productImage}
                >
                  {hasImages ? (
                    <ul>
                      {images.map((image, index) => (
                        <li key={`product-image-${index}`}>
                          <GatsbyImage
                            objectFit="contain"
                            alt={
                              image.altText
                                ? image.altText
                                : `Product Image of ${title} #${index + 1}`
                            }
                            image={image.gatsbyImageData}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={noImagePreview}>No Preview image</span>
                  )}
                </div>
                {hasMultipleImages && (
                  <div className={scrollForMore}>
                    <span aria-hidden="true">←</span> scroll for more{' '}
                    <span aria-hidden="true">→</span>
                  </div>
                )}
              </div>
            )}

            <div className={infodiv}>
              <Stack spacing={4}>
                <h1 className={header}>{title}</h1>
                <p>{description}</p>
              </Stack>
              <div className={priceingdiv}>
                <h2 className={priceValue}>
                  <span>{price} </span> incl. 7% VAT plus shipping
                </h2>
                <form noValidate>
                  <fieldset>
                    <label htmlFor="quantity"></label>
                    <NumberInput
                      onChange={(_, value) => setQuantity(value)}
                      value={quantity}
                      id="quantity"
                      name="quantity"
                      defaultValue={1}
                      min={1}
                      maxW={20}
                    >
                      <NumberInputField bg={bgInput} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </fieldset>
                  {hasVariants && (
                    <>
                      {options.map(({ id, name, values }, index) => (
                        <React.Fragment key={id}>
                          <Stack as="fieldset" mt={4} mr={6}>
                            <label htmlFor="variant"></label>
                            <Select
                              variant="filled"
                              bg={bgInput}
                              onChange={(event) =>
                                handleOptionChange(index, event)
                              }
                            >
                              <option value="">{`Select ${name}`}</option>
                              {values.map((value) => (
                                <option value={value} key={`${name}-${value}`}>
                                  {value}
                                </option>
                              ))}
                            </Select>
                          </Stack>
                        </React.Fragment>
                      ))}
                    </>
                  )}
                  <AddToCart
                    variantId={productVariant.storefrontId}
                    quantity={quantity}
                    available={available}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Container my={[20, 28]}>
        <Heading as="h2" mb={8} fontSize="3xl" color={headingColor}>
          More Products
        </Heading>
        <ProductListing products={suggestions} />
      </Container> */}
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        gatsbyImageData(layout: CONSTRAINED, width: 640)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
