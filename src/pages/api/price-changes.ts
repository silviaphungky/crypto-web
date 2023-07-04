import { NextApiRequest, NextApiResponse } from 'next'

export interface PriceChangeResponse {
  day: string
  latestPrice: string
  month: string
  pair: string
  week: string
  year: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    code?: string
    message: string
    payload?: Array<PriceChangeResponse>
  }>
) {
  try {
    const response = await fetch(
      'https://api.pintu.co.id/v2/trade/price-changes'
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
