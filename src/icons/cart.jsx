import * as React from "react"

function CartIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Cart"}</title>
      <path
        d="M3.077 5.05A2 2 0 015.076 3h13.848a2 2 0 012 2.05l-.35 14a2 2 0 01-2 1.95H5.426a2 2 0 01-2-1.95l-.35-14z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M16 6c0 2.761-1.79 5-4 5S8 8.761 8 6"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}

export default CartIcon
