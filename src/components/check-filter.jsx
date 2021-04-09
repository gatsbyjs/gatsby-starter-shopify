import * as React from 'react'
import { filterStyle, summary, clearButton } from './check-filter.module.css'
export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
  onFilter,
}) {
  const toggleItem = ({ currentTarget: input }) => {
    if (input.checked) {
      setSelectedItems((items) => {
        const newItems = [...items, input.value]
        onFilter(newItems, name)
        return newItems
      })
    } else {
      setSelectedItems((items) => {
        const idx = items.indexOf(input.value)
        if (idx === -1) {
          return
        }
        const newItems = [...items.slice(0, idx), ...items.slice(idx + 1)]
        onFilter(newItems, name)
        return newItems
      })
    }
  }

  const clearItems = () => {
    setSelectedItems([])
  }

  return (
    <details open={open} className={filterStyle}>
      {name && (
        <summary className={summary}>
          {name}{' '}
          <button className={clearButton} onClick={clearItems}>
            Clear
          </button>
        </summary>
      )}
      {items.map((item) => (
        <label
          style={{
            color: selectedItems.includes(item)
              ? `inherit`
              : `var(--black-fade-40)`,
          }}
          key={item}
        >
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
