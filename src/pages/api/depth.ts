import { NextApiRequest, NextApiResponse } from 'next'

export interface DepthResponse {
  asks: Array<Array<string>>
  bids: Array<Array<string>>
  lastUpdated: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<DepthResponse> | { message?: string }>
) {
  try {
    const body = req.body
    const symbol = JSON.parse(body).symbol
    const response = await fetch(
      `https://www.binance.info/api/v3/depth?symbol=${symbol}&limit=1000
`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    const resp = error as { response: {} }
    console.error(resp.response)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
