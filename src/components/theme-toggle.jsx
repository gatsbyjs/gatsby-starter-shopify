import * as React from 'react'
import { useColorMode, Button } from '@chakra-ui/react'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === 'light'

  return (
    <Button
      onClick={toggleColorMode}
      size="sm"
      variant="outline"
      aria-label={
        isLight ? `Activate dark color mode` : `Activate light color mode`
      }
    >
      {isLight ? 'Light' : 'Dark'}
    </Button>
  )
}

export default ThemeToggle
