/**
 * Formats a currency according to the user's locale
 * @param {string} currency The ISO currency code
 * @param {number} value The amount to format
 * @returns
 */
export const formatPrice = (currency, value) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value)

export const getCurrencySymbol = (currency, locale = undefined) => {
  if (!currency) {
    return
  }
  const formatter = Intl.NumberFormat(locale, {
    currency,
    style: "currency",
  })
  const parts = formatter.formatToParts(100)
  const { value: symbol } = parts.find((part) => part.type === "currency")
  const formatted = formatter.format(100)
  const symbolAtEnd = formatted.endsWith(symbol)
  return { symbol, symbolAtEnd }
}
