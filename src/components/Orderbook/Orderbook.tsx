import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { useWebsocket } from '@context/websocket'
import { formatDecimalPrice } from '@utils/formatDecimalPrice'

import styles from './_Orderbook.module.css'
import { TradeApi } from '@services/trade-api'
import { useQuery } from '@tanstack/react-query'

const id = 1

const Orderbook = () => {
  const { socket, ready } = useWebsocket()

  const router = useRouter()
  const { symbol } = router.query as { symbol: string }
  const [bidObj, setBidObj] = useState({})
  const [askObj, setAskObj] = useState({})

  const currency = `${symbol.toLowerCase()}usdt`
  const params = `${currency}@depth`

  const { data = {}, isLoading } = useQuery({
    queryKey: ['depth'],
    queryFn: () => TradeApi.getOrderBook(currency.toUpperCase()),
  })

  useEffect(() => {
    if (data.bids) {
      let tempBidObj = bidObj
      const bidList = data.bids as []
      const top30Bid = bidList
      top30Bid.forEach((item) => {
        tempBidObj[item[0]] = item[1]
      })
      setBidObj({ ...tempBidObj })

      let tempAskObj = askObj
      const askList = data.asks as []
      const top30Ask = askList
      top30Ask.forEach((item) => {
        tempAskObj[item[0]] = item[1]
      })
      setAskObj({ ...tempAskObj })
    }
  }, [data])

  useEffect(() => {
    if (socket && ready) {
      socket.addEventListener('message', async function (event) {
        const data = JSON.parse(event.data)

        if (data.stream) {
          const isRelatedData = data.stream === params
          if (isRelatedData) {
            let tempBidObj = bidObj
            const bidList = data.data.b as []
            const top30Bid = bidList
            top30Bid.forEach((item) => {
              tempBidObj[item[0]] = item[1]
            })
            setBidObj({ ...tempBidObj })

            let tempAskObj = askObj
            const askList = data.data.a as []
            const top30Ask = askList
            top30Ask.forEach((item) => {
              tempAskObj[item[0]] = item[1]
            })
            setAskObj({ ...tempAskObj })
          }
        }
      })
    }
  }, [ready, socket])

  const objToArr = useCallback((obj: { [key in string]: string }) => {
    return Object.keys(obj).map((key) => ({
      price: Number(key),
      vol: obj[key],
    }))
  }, [])

  let arrBid = useMemo(() => objToArr(bidObj), [bidObj])
  const sortedBid = arrBid
    .sort((a, b) => b.price - a.price)
    .filter((el) => !!Number(el.vol))

  let arrAsk = useMemo(() => objToArr(askObj), [askObj])
  const sortedAsk = arrAsk
    .sort((a, b) => a.price - b.price)
    .filter((el) => !!Number(el.vol))

  return (
    <div>
      <div className="flex items-start gap-6 sm:gap-0">
        <table className={`${styles['orderbook__table']} table-fixed`}>
          <thead className={`${styles.orderbook__thead}`}>
            <tr>
              <th className="text-left sm:text-sm break-words">{`Amount (${symbol.toUpperCase()})`}</th>
              <th className="text-right sm:text-sm break-words">Bid (USDT)</th>
            </tr>
          </thead>
          <tbody>
            {sortedBid.slice(0, 10).map((item) => {
              if (!Number(item.vol)) return null
              return (
                <tr key={`bid-${item.price}`}>
                  <td className="text-left sm:text">
                    {formatDecimalPrice(Number(item.vol))}
                  </td>
                  <td className="text-right text-bullish sm:text">
                    {formatDecimalPrice(item.price)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <table className={`${styles['orderbook__table']} table-fixed`}>
          <thead className={`${styles.orderbook__thead}`}>
            <tr>
              <th className="text-left sm:text-sm break-words">Ask (USDT)</th>
              <th className="text-right sm:text-sm break-words">{`Amount (${symbol.toUpperCase()})`}</th>
            </tr>
          </thead>
          <tbody>
            {sortedAsk.slice(0, 10).map((item) => {
              if (!Number(item.vol)) return null
              return (
                <tr key={`ask-${item.price}`}>
                  <td className="text-left text-bearish sm:text">
                    {formatDecimalPrice(item.price)}
                  </td>
                  <td className="text-right sm:text">
                    {formatDecimalPrice(Number(item.vol))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orderbook
