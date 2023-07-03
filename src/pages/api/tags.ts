import { NextApiRequest, NextApiResponse } from 'next'

interface Payload {
  created_at: string
  currencies: Array<{
    created_at: string
    id: number
    name: string
    updated_at: string
  }>
  icon: {
    alternativeText: string
    caption: string
    created_at: string
    ext: string
    url: string
    width: number
  }
  id: number
  image: {
    ext: string
    url: string
    width: number
  }
  meta_description: string
  meta_title: string
  order: number
  published_at: string
  slug: string
  statusbar: string
  subtitle: string
  title: string
  updated_at: string
  url: null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    code?: string
    message: string
    payload?: Array<Payload>
  }>
) {
  try {
    const response = await fetch(
      'https://content.pintu.co.id/market-tags?language.name=ID&_sort=order:ASC'
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching data' })
  }
}
