import * as React from "react"

function CrossIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        d="M6.343 6.571l11.314 11.314M6.343 17.885L17.657 6.571"
      />
    </svg>
  )
}

export default CrossIcon
