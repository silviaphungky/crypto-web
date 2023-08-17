export const ChartApi = {
  get: async (selectedInterval: string) => {
    const response = await fetch(
      `https://www.binance.info/api/v3/uiKlines?limit=1000&symbol=BTCUSDT&interval=${selectedInterval}`
    )
    const data = await response.json()

    return data
  },
}
