export const WalletApi = {
  getSupportedChanges: async () => {
    const response = await fetch('/api/supported-changes')
    const data = await response.json()

    return data
  },
}
