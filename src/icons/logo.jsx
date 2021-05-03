import * as React from "react"

function Logo(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Logo</title>
      <path
        d="M13 23.959C19.16 23.45 24 18.29 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.29 4.84 11.45 11 11.959v-8.56S10.8 12 8 12c0 0 1.5.8 1.9 3.7C4.2 16.9 4 9.1 4 9.1s6.1-.9 7.3 3C12.1 6 21 7 21 7s0 9.6-7 8.9c0-2 2-5 2-5-3 1-3 4.9-3 4.9v8.16zM12.041 24h-.082.082z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Logo
