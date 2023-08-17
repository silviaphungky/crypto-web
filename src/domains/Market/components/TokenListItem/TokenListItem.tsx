import { TradeApi } from '@services/trade-api'
import { useQuery } from '@tanstack/react-query'
import arrayToObject from '@utils/arrayToObject'
import { SupportedChangesResponse } from 'src/pages/api/supported-changes'
import { Dispatch, useEffect, useRef } from 'react'
import { DateRange } from '../TokenListTable/TokenListTable'
import { PriceChangeResponse } from 'src/pages/api/price-changes'
import SortMiddleware from './SortMiddleware'
import { Shimmer } from '@components'

interface Props {
  i: number
  dateRange: DateRange
  currency: SupportedChangesResponse
  sortBy: string
  sortDir?: 'asc' | 'desc'
  tokens: Array<SupportedChangesResponse>
  isLoadingSupportedCurrencies: boolean
  setTokenList: Dispatch<Array<SupportedChangesResponse>>
}

const TokenListItem = ({
  i,
  tokens,
  dateRange,
  currency,
  sortBy,
  sortDir,
  isLoadingSupportedCurrencies,
  setTokenList,
}: Props) => {
  const priceRef = useRef()

  const { data, isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: TradeApi.getPriceChanges,
    refetchInterval: 1000,
  })

  useEffect(() => {
    if (!isLoading) {
      priceRef.current = data.payload
    }
  }, [data])

  const textColor = (price: string) => {
    if (Number(price) === 0) return 'text-black'
    else if (Number(price) > 0) return 'text-bullish'
    else return 'text-bearish'
  }

  const currencySymbol = currency.currencySymbol

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pricesChanges = (
    !isLoading ? data.payload : []
  ) as PriceChangeResponse[]

  const pricesChangesObject =
    arrayToObject(pricesChanges, (item) => item.pair.split('/idr')[0]) || {}

  const price = pricesChangesObject[currencySymbol.toLowerCase()] || {}

  const prevPriceChangesObject = priceRef.current
    ? arrayToObject(priceRef.current, (item) => item.pair.split('/idr')[0])
    : {}
  const prevChangesPrice =
    prevPriceChangesObject[currencySymbol.toLowerCase()] || {}

  const deltaLatestPrice = String(
    Number(price.latestPrice) - Number(prevChangesPrice.latestPrice) || '0'
  )

  return (
    <>
      {sortDir && i === 2 ? (
        <SortMiddleware
          tokens={tokens}
          sortDir={sortDir}
          sortBy={sortBy}
          pricesChanges={pricesChanges}
          setTokenList={setTokenList}
        />
      ) : null}
      <td>
        {isLoadingSupportedCurrencies ? (
          <Shimmer />
        ) : (
          <>
            <div
              className={`font-semibold ${textColor(
                deltaLatestPrice
              )} sm:text-right`}
            >{`${new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(Number(price.latestPrice || 0))}`}</div>
            <div
              className={`md:hidden lg:hidden xl:hidden font-semibold text-right text-md ${textColor(
                price.day || '0'
              )}`}
            >
              {`${price[dateRange] || 0}%`}
            </div>
          </>
        )}
      </td>
      <td className="sm:hidden">
        {isLoadingSupportedCurrencies ? (
          <Shimmer />
        ) : (
          <div
            className={`font-semibold text-center text-md ${textColor(
              price.day || '0'
            )}`}
          >
            {`${price.day || 0}%`}
          </div>
        )}
      </td>
      <td
        className={`font-semibold text-center ${textColor(
          price.week || '0'
        )} sm:hidden`}
      >
        {isLoadingSupportedCurrencies ? <Shimmer /> : `${price.week || 0}%`}
      </td>
      <td
        className={`font-semibold text-center ${textColor(
          price.month || '0'
        )} sm:hidden`}
      >
        {isLoadingSupportedCurrencies ? <Shimmer /> : `${price.month || 0}%`}
      </td>
      <td
        className={`font-semibold text-center ${textColor(
          price.year || '0'
        )} sm:hidden`}
      >
        {isLoadingSupportedCurrencies ? <Shimmer /> : `${price.year || 0}%`}
      </td>
    </>
  )
}

export default TokenListItem
