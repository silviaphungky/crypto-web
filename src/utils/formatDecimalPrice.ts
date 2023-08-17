export const formatDecimalPrice = (number: number) => {
  if (number < 1) {
    return new Intl.NumberFormat('en-En', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(number)
  } else
    return new Intl.NumberFormat('en-En', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
}
