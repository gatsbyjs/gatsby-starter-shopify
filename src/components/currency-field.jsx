// @ts-check
import * as React from "react"
import {
  input,
  currencySymbol,
  wrap,
  symbolAfter,
} from "./currency-field.module.css"

export function CurrencyField({
  symbol,
  symbolAtEnd,
  style,
  className,
  ...props
}) {
  return (
    <span
      className={[className, wrap, symbolAtEnd && symbolAfter]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <span className={currencySymbol}>{symbol}</span>
      <input
        type="numeric"
        className={input}
        data-currency={symbol}
        {...props}
      />
    </span>
  )
}
