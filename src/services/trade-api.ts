export const TradeApi = {
  getPriceChanges: async () => {
    const response = await fetch('/api/price-changes')
    const data = await response.json()

    return data
  },
  getRunningTrade: async (symbol: string) => {
    const response = await fetch('/api/trades', {
      method: 'POST',
      body: JSON.stringify({ symbol }),
    })
    const data = await response.json()

    return data
  },
  getOrderBook: async (symbol: string) => {
    const response = await fetch('/api/depth', {
      method: 'POST',
      body: JSON.stringify({ symbol }),
    })
    const data = await response.json()

    return data
  },
}
