import { useWebsocket } from '@context/websocket'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { ChartApi } from '@services/chart-api'
import style from './_Candlestick.module.css'
import { formatDecimalPrice } from '@utils/formatDecimalPrice'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const id = 2

const intervals = ['4h', '1d', '1w', '1M']

const CandleStick = () => {
  const router = useRouter()
  const { symbol } = router.query as { symbol: string }

  const [selectedInterval, setSelectedInterval] = useState('1M')
  const [currentPrice, setCurrentPrice] = useState<{
    [key in string]: number | string
  }>({
    open: formatDecimalPrice(0),
    high: formatDecimalPrice(0),
    low: formatDecimalPrice(0),
    close: formatDecimalPrice(0),
  })
  const paramsRef = useRef('')
  const params = `${symbol.toLowerCase()}usdt@kline_${selectedInterval}`

  const { data = [], isLoading } = useQuery({
    queryKey: ['chart', selectedInterval],
    queryFn: () => ChartApi.get(selectedInterval),
  })

  const series = [
    {
      data: data.map((item: Array<string>) => {
        const open = item[1]
        const high = item[2]
        const low = item[3]
        const close = item[4]
        return {
          x: new Date(item[0]),
          y: [open, high, low, close],
        }
      }),
    },
  ]

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    noData: {
      text: 'fetching data...',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#ececec',
        fontSize: '20px',
        fontFamily: undefined,
      },
    },
  }

  const { socket, ready } = useWebsocket()
  useEffect(() => {
    if (socket && ready) {
      socket.addEventListener('message', async function (event) {
        const data = JSON.parse(event.data)
        if (data.stream) {
          const isRelatedData = data.stream === params
          if (isRelatedData) {
            const streamData = data.data

            const open = streamData.k.o
            const close = streamData.k.c
            const high = streamData.k.h
            const low = streamData.k.l
            const updated = {
              open,
              close,
              high,
              low,
            }

            setCurrentPrice(updated)
          }
        }
      })
    }
  }, [ready, socket, selectedInterval])

  useEffect(() => {
    if (socket && ready) {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: [params],
          id,
        })
      )

      if (paramsRef.current && paramsRef.current !== params) {
        socket.send(
          JSON.stringify({
            method: 'UNSUBSCRIBE',
            params: [paramsRef.current],
            id,
          })
        )
      }
    }

    paramsRef.current = params
  }, [params, socket, ready])

  const intervalClass = (isSelected: boolean) => {
    return isSelected
      ? `${style['interval__item--selected']} bg-yellowPrimary`
      : style.interval__item
  }

  return (
    <>
      <div className="flex sm:mb-4 md:flex-col items-baseline lg:flex-row justify-between items-center">
        <div className="flex gap-2">
          {intervals.map((item) => (
            <div
              className={intervalClass(selectedInterval === item)}
              key={`interval-${item}`}
              onClick={() => setSelectedInterval(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex gap-2 sm:flex-col mt-4 ">
          <div className="flex gap-1.5">
            <div className="capitalize font-semibold sm:text-xs">{`Open :`}</div>
            <div className="sm:text-xs">
              {formatDecimalPrice(Number(currentPrice.open))}
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="capitalize font-semibold sm:text-xs">{`High :`}</div>
            <div className="sm:text-xs">
              {formatDecimalPrice(Number(currentPrice.high))}
            </div>
          </div>

          <div className="flex gap-1.5">
            <div className="capitalize font-semibold sm:text-xs">{`Low :`}</div>
            <div className="sm:text-xs">
              {formatDecimalPrice(Number(currentPrice.low))}
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="capitalize font-semibold sm:text-xs">{`Close :`}</div>
            <div className="sm:text-xs">
              {formatDecimalPrice(Number(currentPrice.close))}
            </div>
          </div>
        </div>
      </div>
      <ReactApexChart
        series={series}
        options={options as ApexOptions}
        type="candlestick"
        height={350}
      />
    </>
  )
}

export default CandleStick
