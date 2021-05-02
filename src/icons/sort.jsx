import * as React from "react"

function SortIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Sort"}</title>
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        d="M3 6h18M7 12h10M9 18h6"
      />
    </svg>
  )
}

export default SortIcon
