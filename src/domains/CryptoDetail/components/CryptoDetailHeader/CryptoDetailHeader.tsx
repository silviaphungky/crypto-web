import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useWebsocket } from '@context/websocket'
import { formatDecimalPrice } from '@utils/formatDecimalPrice'

const CryptoDetailHeader = () => {
  const router = useRouter()
  const { symbol } = router.query as { symbol: string }
  const currency = `${symbol.toLowerCase()}usdt`
  const aggTrade = `${currency}@aggTrade`
  const miniTicker = `${currency}@miniTicker`
  const [price, setPrice] = useState(0)
  const [twentyFourHChanges, setTwentyFourHChanges] = useState({
    h: 0,
    l: 0,
    v: 0,
    percentChange: 0,
  })

  const { socket, ready } = useWebsocket()
  useEffect(() => {
    if (socket && ready) {
      socket.addEventListener('message', async function (event) {
        const data = JSON.parse(event.data)

        if (data.stream) {
          const isAggTrade = data.stream === aggTrade
          if (isAggTrade) {
            const updatedPrice = data.data.p
            setPrice(updatedPrice)
          }

          const isMiniTicker = data.stream === miniTicker
          if (isMiniTicker) {
            setTwentyFourHChanges({
              h: data.data.h,
              l: data.data.l,
              v: data.data.v,
              percentChange: 0,
            })
          }
        }
      })
    }
  }, [ready, socket])

  return (
    <div className="flex gap-4 mb-6 mt-2 justify-between sm:flex-col border-b pb-4 mb-2">
      <div className="flex gap-4">
        <h3 className="uppercase font-bold text-xl">{`${symbol}/USDT`}</h3>
        <div className="text-xl">{formatDecimalPrice(price)}</div>
      </div>
      <div className="flex gap-4">
        <div>
          <div className="text-sm text-gray-400">High 24 jam</div>
          <div>{formatDecimalPrice(twentyFourHChanges.h)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Low 24 jam</div>
          <div>{formatDecimalPrice(twentyFourHChanges.l)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">{`Volume 24 jam (${symbol.toLocaleUpperCase()})`}</div>
          <div>{formatDecimalPrice(twentyFourHChanges.v)}</div>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetailHeader
