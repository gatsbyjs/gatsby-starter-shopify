import * as React from 'react'
import { Box } from '@chakra-ui/react'

const Spacer = ({ size, axis, ...rest }) => {
  const width = axis === `vertical` ? `1px` : size
  const height = axis === `horizontal` ? `1px` : size
  return (
    <Box
      as="span"
      width={width}
      height={height}
      minWidth={width}
      minHeight={height}
      display="block"
      {...rest}
    />
  )
}

export default Spacer
