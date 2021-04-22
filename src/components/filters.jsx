import * as React from "react"
import { CheckFilter } from "./check-filter"
import { CurrencyField } from "./currency-field"
import {
  priceFilterStyle,
  clearButton,
  priceFields,
} from "./filters.module.css"

export function Filters({
  currencyCode,
  productTypes,
  tags,
  vendors,
  filters,
  setFilters,
}) {
  const updateFilter = (key, value) => {
    setFilters((filters) => ({ ...filters, [key]: value }))
  }

  return (
    <>
      <CheckFilter
        name="Type"
        items={productTypes}
        selectedItems={filters.productTypes}
        setSelectedItems={(value) => updateFilter("productTypes", value)}
      />
      <hr />
      <details className={priceFilterStyle} open={true}>
        <summary>
          Price
          <button
            className={clearButton}
            onClick={() =>
              setFilters((filters) => ({
                ...filters,
                maxPrice: "",
                minPrice: "",
              }))
            }
          >
            Reset
          </button>
        </summary>
        <div className={priceFields}>
          <CurrencyField
            {...currencyCode}
            aria-label="Minimum price"
            value={filters.minPrice}
            onChange={(_, value) => updateFilter("minPrice", value)}
          />{" "}
          –{" "}
          <CurrencyField
            {...currencyCode}
            aria-label="Maximum price"
            value={filters.maxPrice}
            onChange={(_, value) => updateFilter("maxPrice", value)}
          />
        </div>
      </details>
      <hr />
      <CheckFilter
        name="Brands"
        items={vendors}
        selectedItems={filters.vendors}
        setSelectedItems={(value) => updateFilter("vendors", value)}
      />
      <hr />
      <CheckFilter
        open={false}
        name="Tags"
        items={tags}
        selectedItems={filters.tags}
        setSelectedItems={(value) => updateFilter("tags", value)}
      />
    </>
  )
}
