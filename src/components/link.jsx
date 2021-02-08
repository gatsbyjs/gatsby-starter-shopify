import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { chakra } from '@chakra-ui/react'

const ChakraLink = chakra(GatsbyLink, {
  baseStyle: {
    transition: `all .3s ease-in-out`,
    cursor: `pointer`,
    textDecoration: `none`,
    outline: `none`,
    _hover: {
      textDecoration: `underline`,
    },
    _focus: {
      boxShadow: `outline`,
    },
  },
})

/**
 * ChakraLink with gatsby-link (no external links)
 */
const Link = (props) => <ChakraLink {...props} />

export default Link
