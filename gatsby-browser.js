import * as React from 'react'
import { StoreProvider } from './src/context/store-context'

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
