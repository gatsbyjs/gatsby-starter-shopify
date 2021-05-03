import * as React from "react"

function DeleteIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9 9h2v8H9V9zM12.999 9h2v8h-2V9z" fill="currentColor" />
      <path stroke="currentColor" strokeWidth={2} d="M10 9v8" />
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        d="M20 6H4"
      />
      <path
        stroke="currentColor"
        strokeWidth={2}
        d="M14 9v8M8 4.75C8 3.784 8.784 3 9.75 3h4.5c.966 0 1.75.784 1.75 1.75V6H8V4.75z"
      />
      <path
        d="M6 6h12v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6z"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}

export default DeleteIcon
