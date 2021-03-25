import * as React from 'react'
import { filterStyle } from './check-filter.module.css'
export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
}) {
  const toggleItem = React.useCallback(
    ({ currentTarget: input }) => {
      if (input.checked) {
        setSelectedItems((items) => [...items, input.value])
      } else {
        setSelectedItems((items) => {
          const idx = items.indexOf(input.value)
          if (idx === -1) {
            return
          }
          return [...items.slice(0, idx), ...items.slice(idx + 1)]
        })
      }
    },
    [setSelectedItems]
  )

  return (
    <details open={open} className={filterStyle}>
      {name && <summary>{name}</summary>}
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            onChange={toggleItem}
            value={item}
            checked={selectedItems.includes(item)}
          />{' '}
          {item || 'None'}
        </label>
      ))}
    </details>
  )
}
export default CheckFilter
