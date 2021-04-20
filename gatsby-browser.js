import * as React from "react"
import { StoreProvider } from "./src/context/store-context"
import "./src/styles/reset.css"
import "./src/styles/variables.css"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
