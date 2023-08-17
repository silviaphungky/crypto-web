export const TokenIconApi = {
  getAllIcon: async () => {
    const response = await fetch('/api/icon')
    const data = await response.json()

    return data
  },
}
