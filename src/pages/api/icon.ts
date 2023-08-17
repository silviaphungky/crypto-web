import { NextApiRequest, NextApiResponse } from 'next'

export interface IconResponse {
  assetName: string
  id: number
  logoUrl: string
  type: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    code?: string
    message: string
    payload?: Array<IconResponse>
  }>
) {
  try {
    const response = await fetch(
      'https://www.tokocrypto.com/bapi/asset/v2/public/asset/asset/get-all-asset'
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error.response)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
