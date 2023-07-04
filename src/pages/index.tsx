import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PATHS } from '@constants/paths'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push(PATHS.MARKET)
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>Loading</div>
    </main>
  )
}
