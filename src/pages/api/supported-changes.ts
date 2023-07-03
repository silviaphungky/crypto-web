import { NextApiRequest, NextApiResponse } from 'next'

export interface SupportedChangesResponse {
  color: string
  currencyGroup: string
  currencySymbol: string
  decimal_point: number
  listingDate: string
  logo: string
  name: string
  wallets: Array<{
    blockchain: string
    blockchainName: string
    currencyGroup: string
    decimal_point: number
    explorer: string
    listingDate: string
    logo: string
    tokenSymbol: string
    tokenType: string
  }>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    code?: string
    message: string
    payload?: Array<SupportedChangesResponse>
  }>
) {
  try {
    const response = await fetch(
      'https://api.pintu.co.id/v2/wallet/supportedCurrencies'
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
