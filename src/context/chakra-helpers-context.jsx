import * as React from 'react'
import colors from '../@chakra-ui/gatsby-plugin/theme/foundations/colors'
import { useToken } from '@chakra-ui/react'

const defaultValues = {
  primaryColorScheme: colors.primaryColorScheme,
}

export const ChakraHelpersContext = React.createContext(defaultValues)

/**
 * The purpose of this provider is to expose tokens as variables that Chakra UI doesn't understand at the moment
 * So right now you can't use <Button colorScheme="primaryColorScheme" /> as it doesn't resolve "primaryColorScheme" to "blue"
 * With this central place for such tokens it's only called once and stored in this provider
 */
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
