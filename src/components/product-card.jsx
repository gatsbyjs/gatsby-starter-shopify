import * as React from 'react'
import { graphql } from 'gatsby'
import { Heading, Box, useColorModeValue, Grid, Tag } from '@chakra-ui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Link from './link'
import formatPrice from '../utils/format-price'
import { ChakraHelpersContext } from '../context/chakra-helpers-context'

const ProductCard = ({ product }) => {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
  } = product

  const { primaryColorScheme } = React.useContext(ChakraHelpersContext)
  const bg = useColorModeValue(`cardBg`, `dark.cardBg`)
  const linkHoverColor = useColorModeValue(
    `cardLinkHover`,
    `dark.cardLinkHover`
  )
  const linkColor = useColorModeValue(`cardLink`, `dark.cardLink`)

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  return (
    <Link
      to={slug}
      aria-label={`View ${title} product page`}
      _hover={{ textDecoration: 'none', h2: { color: linkHoverColor } }}
      _focus={{
        boxShadow: 'none',
        "[data-name='product-image-box']": { boxShadow: 'outline' },
        h2: { color: linkHoverColor },
      }}
    >
      <Box bg={bg} p={6} data-name="product-image-box">
        <GatsbyImage
          alt=""
          image={firstImage.localFile.childImageSharp.gatsbyImageData}
        />
      </Box>
      <Grid templateColumns="auto auto" gap={6} mt={6}>
        <Heading
          as="h2"
          fontSize="24px"
          color={linkColor}
          transition="color 0.25s ease-in-out"
        >
          {title}
        </Heading>
        <Tag
          alignSelf="flex-start"
          justifySelf="flex-end"
          size="lg"
          colorScheme={primaryColorScheme}
        >
          {price}
        </Tag>
      </Grid>
    </Link>
  )
}

export default ProductCard

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      localFile {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 1
            formats: [AUTO, WEBP, AVIF]
            quality: 90
            width: 640
          )
        }
      }
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`
