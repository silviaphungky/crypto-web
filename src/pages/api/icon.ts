import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const imgUrl = JSON.parse(req.body).url
    const response = await fetch(imgUrl)
    const data = await response.text()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
