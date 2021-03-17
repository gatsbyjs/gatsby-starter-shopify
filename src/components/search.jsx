import * as React from 'react'
import { searchBarStyle } from './search.module.css'

const Search = () => {
  return (
    <div>
      <input className={searchBarStyle} placeholder="Search products..." />
    </div>
  )
}
export default Search
