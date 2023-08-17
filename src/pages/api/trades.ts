import { NextApiRequest, NextApiResponse } from 'next'

export interface RunningTradeResponse {
  M: boolean
  T: number
  a: number
  f: number
  l: number
  m: boolean
  p: string
  q: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<RunningTradeResponse> | { message?: string }>
) {
  try {
    const body = req.body
    const symbol = JSON.parse(body).symbol
    const response = await fetch(
      `https://www.binance.info/api/v3/aggTrades?limit=80&symbol=${symbol}&limit=80`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
