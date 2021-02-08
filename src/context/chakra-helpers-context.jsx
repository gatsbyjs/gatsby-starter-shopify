import * as React from 'react'
import colors from '../@chakra-ui/gatsby-plugin/theme/foundations/colors'
import { useToken } from '@chakra-ui/react'

const defaultValues = {
  primaryColorScheme: colors.primaryColorScheme,
}

export const ChakraHelpersContext = React.createContext(defaultValues)

export const ChakraHelpersProvider = ({ children }) => {
  const [primaryColorScheme] = useToken('colors', ['primaryColorScheme'])

  return (
    <ChakraHelpersContext.Provider
      value={{
        primaryColorScheme,
      }}
    >
      {children}
    </ChakraHelpersContext.Provider>
  )
}
