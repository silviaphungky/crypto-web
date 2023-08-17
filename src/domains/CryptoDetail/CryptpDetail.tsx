import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { CandleStick } from '@components'
import { CryptoDetailHeader, CryptoDetailTabs } from './components'

import { useWebsocket } from '@context/websocket'

const id = 1

const CryptoDetailPage = () => {
  const router = useRouter()
  const { symbol } = router.query as { symbol: string }
  const currency = `${symbol.toLowerCase()}usdt`
  const params = [
    `${currency}@depth`,
    `${currency}@aggTrade`,
    `${currency}@miniTicker`,
  ]

  const { socket, ready } = useWebsocket()

  useEffect(() => {
    if (socket && ready) {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params,
          id,
        })
      )

      return () => {
        socket.send(
          JSON.stringify({
            method: 'UNSUBSCRIBE',
            params,
            id,
          })
        )
      }
    }
  }, [ready, socket])

  return (
    <>
      <CryptoDetailHeader />
      <CandleStick />
      <CryptoDetailTabs currency={currency} />
    </>
  )
}

export default CryptoDetailPage
