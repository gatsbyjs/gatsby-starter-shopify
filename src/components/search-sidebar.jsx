import * as React from 'react'
import { CheckFilter } from './check-filter'
import { sidebarStyle } from './search-sidebar.module.css'

export const SearchSidebar = ({ productTypes, vendors, tags }) => {
  const [selectedTags, setSelectedTags] = React.useState(tags)
  const [selectedVendors, setSelectedVendors] = React.useState(vendors)
  const [selectedProductTypes, setSelectedProductTypes] = React.useState(
    productTypes
  )

  React.useEffect(() => {}, [
    selectedProductTypes,
    selectedVendors,
    selectedTags,
    productTypes,
    vendors,
    tags,
  ])

  return (
    <div className={sidebarStyle}>
      <CheckFilter
        name="Type"
        items={productTypes}
        selectedItems={selectedProductTypes}
        setSelectedItems={setSelectedProductTypes}
      />
      <CheckFilter
        name="Brands"
        items={vendors}
        selectedItems={selectedVendors}
        setSelectedItems={setSelectedVendors}
      />
      <CheckFilter
        open={false}
        name="Tags"
        items={tags}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
      />
    </div>
  )
}
