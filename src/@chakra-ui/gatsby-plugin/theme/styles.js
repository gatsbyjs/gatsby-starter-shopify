import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.800')(props),
      bg: mode('white', 'gray.900')(props),
    },
    '[data-skip-to-content]': {
      clip: `rect(0 0 0 0)`,
      '&:focus': {
        clip: `auto`,
      },
    },
  }),
}

export default styles
