const formatPrice = (currency, value) =>
  Intl.NumberFormat(undefined, {
    currency: currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(value)

export default formatPrice
