export const TradeApi = {
  getPriceChanges: async () => {
    const response = await fetch('/api/price-changes')
    const data = await response.json()

    return data
  },
}
