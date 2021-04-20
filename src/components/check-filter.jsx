import * as React from "react"
import {
  filterStyle,
  summary,
  clearButton,
  selectedLabel,
  checkbox,
} from "./check-filter.module.css"

export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
}) {
  const toggleItem = ({ currentTarget: input }) => {
    if (input.checked) {
      setSelectedItems((items) => {
        const newItems = [...items, input.value]
        return newItems
      })
    } else {
      setSelectedItems((items) => {
        const idx = items.indexOf(input.value)
        if (idx === -1) {
          return
        }
        const newItems = [...items.slice(0, idx), ...items.slice(idx + 1)]
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
          {name}{" "}
          <button className={clearButton} onClick={clearItems}>
            Clear
          </button>
        </summary>
      )}
      {items.map((item) => (
        <label
          className={selectedItems.includes(item) ? selectedLabel : undefined}
          key={item}
        >
          <input
            type="checkbox"
            className={checkbox}
            onChange={toggleItem}
            value={item}
            checked={selectedItems.includes(item)}
          />{" "}
          {item || "None"}
        </label>
      ))}
    </details>
  )
}
