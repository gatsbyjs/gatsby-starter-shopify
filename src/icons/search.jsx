import * as React from "react"

function SearchIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Search"}</title>
      <circle cx={11} cy={11} r={7} stroke="currentColor" strokeWidth={2} />
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        d="M15.914 16l4.596 4.596"
      />
    </svg>
  )
}

export default SearchIcon
