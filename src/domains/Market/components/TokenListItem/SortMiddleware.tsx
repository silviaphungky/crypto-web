import { Dispatch, useEffect } from 'react'
import { PriceChangeResponse } from 'src/pages/api/price-changes'
import { SupportedChangesResponse } from 'src/pages/api/supported-changes'

interface Props {
  sortBy: string
  sortDir?: 'asc' | 'desc'
  tokens: Array<SupportedChangesResponse>
  setTokenList: Dispatch<Array<SupportedChangesResponse>>
  pricesChanges: Array<PriceChangeResponse>
}

const SortMiddleware = ({
  tokens,
  setTokenList,
  sortDir,
  sortBy,
  pricesChanges,
}: Props) => {
  useEffect(() => {
    if (sortDir) {
      const ascSort = (arr: PriceChangeResponse[]) => {
        return arr.sort(
          (a: any, b: any) => Number(a[sortBy]) - Number(b[sortBy])
        )
      }

      const descSort = (arr: PriceChangeResponse[]) => {
        return arr.sort(
          (a: any, b: any) => Number(b[sortBy]) - Number(a[sortBy])
        )
      }

      const sortedPrices =
        sortDir === 'asc' ? ascSort(pricesChanges) : descSort(pricesChanges)
      const sortedSymbol = sortedPrices.map((item: PriceChangeResponse) => {
        const currSymbol = item.pair.split('/idr')[0]
        return currSymbol
      })

      const sortByArray = (
        arr: Array<SupportedChangesResponse>,
        order: Array<string>
      ) => {
        const orderMap = new Map(order.map((value, index) => [value, index]))

        arr.sort((a, b) => {
          const aIndex = orderMap.get(a.currencySymbol.toLowerCase())
          const bIndex = orderMap.get(b.currencySymbol.toLowerCase())
          return (
            (aIndex === undefined) - (bIndex === undefined) || aIndex - bIndex
          )
        })

        return arr
      }

      const tempTokens = [...tokens]

      const sortedData = sortByArray(tempTokens, sortedSymbol)
      setTokenList(sortedData)
    }
  }, [sortDir, pricesChanges, sortBy, tokens, setTokenList])

  return null
}

export default SortMiddleware
