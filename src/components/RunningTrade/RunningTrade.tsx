import { useQuery } from '@tanstack/react-query'

import { TradeApi } from '@services/trade-api'
import { formatDecimalPrice } from '@utils/formatDecimalPrice'

import styles from './_RunningTrade.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWebsocket } from '@context/websocket'
import Shimmer from '@components/Shimmer/Shimmer'
import { useRouter } from 'next/router'

interface Props {
  currency: string
}

const id = 1

const RunningTrade = ({ currency }: Props) => {
  const router = useRouter()
  const { symbol } = router.query as { symbol: string }
  const { socket, ready } = useWebsocket()
  const aggTrade = `${currency}@aggTrade`

  const { data = [], isLoading } = useQuery({
    queryKey: ['chart'],
    queryFn: () => TradeApi.getRunningTrade(currency.toUpperCase()),
  })

  const sortDescData = useMemo(
    () => (data.length ? [...data].reverse() : []),
    [data]
  )
  const [tradeList, setTradeList] = useState<
    Array<{ p: string; q: string; T: number }>
  >([])

  const isBearishRef = useRef(false)

  useEffect(() => {
    if (socket && ready) {
      let realTimeTrades: Array<{ p: string; q: string; T: number }> = []
      socket.addEventListener('message', async function (event) {
        const data = JSON.parse(event.data)

        if (data.stream) {
          const isAggTrade = data.stream === aggTrade
          if (isAggTrade) {
            realTimeTrades.unshift({
              p: data.data.p,
              q: data.data.q,
              T: data.data.T,
            })
            setTradeList([...realTimeTrades, ...tradeList])
          }
        }
      })

      return () => {
        socket.send(
          JSON.stringify({
            method: 'UNSUBSCRIBE',
            params: [currency],
            id,
          })
        )
      }
    }
  }, [ready, socket])

  const mergedData = tradeList.length
    ? [...tradeList, ...sortDescData]
    : sortDescData

  return (
    <div className={`${styles['running-trade__container']}`}>
      <div className={`flex gap-5`}>
        <div className="w-24 font-semibold py-1 px-2">Time</div>
        <div className="w-24 font-semibold py-1 px-2">USDT</div>
        <div className="uppercase w-24 font-semibold py-1 px-2">{symbol}</div>
      </div>

      <div className={`${styles['running-trade__list']}`}>
        {isLoading ? (
          <Shimmer />
        ) : (
          mergedData.map((item, index) => {
            const date = new Date(item.T)
            const HH_mm_ss = `${date.toTimeString().split(' ')[0]}`
            let textColorBear = false

            if (Number(item.p) === Number(mergedData[index + 1]?.p)) {
              textColorBear = isBearishRef.current
            } else if (Number(item.p) < Number(mergedData[index + 1]?.p)) {
              textColorBear = true
              isBearishRef.current = true
            } else {
              textColorBear = false
              isBearishRef.current = false
            }

            return (
              <div className={`flex gap-5 py-1 px-2`} key={index}>
                <div className="w-24">{HH_mm_ss}</div>
                <div
                  className={`w-24 ${
                    textColorBear ? 'text-bearish' : 'text-bullish'
                  }`}
                >
                  {formatDecimalPrice(Number(item.p))}
                </div>
                <div className="w-24">{formatDecimalPrice(item.q)}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default RunningTrade
