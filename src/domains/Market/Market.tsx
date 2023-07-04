'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { IconSearch } from '@components/icons'
import {
  TokenIcon,
  TokenListTable,
  TokenListItem,
  TokenName,
} from './components'
import styles from './_Market.module.css'

import { PATHS } from '@constants/paths'

import { WalletApi } from '@services/wallet-api'
import { SupportedChangesResponse } from 'src/pages/api/supported-changes'

import { DateRange } from './components/TokenListTable/TokenListTable'
import { useEffect, useMemo, useState } from 'react'

const MarketPage = () => {
  const [tokenList, setTokenList] = useState<Array<SupportedChangesResponse>>(
    []
  )
  const [sortBy, setSortBy] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | undefined>(undefined)
  const [sortKey, setSortKey] = useState<Array<string>>([])

  const {
    data: supportedCurrencies,
    isLoading: isLoadingSupportedCurrencies,
    error: errorSupportedError,
  } = useQuery({
    queryKey: ['supportedCurrencies'],
    queryFn: WalletApi.getSupportedChanges,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tokens = (supportedCurrencies?.payload ||
    []) as Array<SupportedChangesResponse>

  useEffect(() => {
    if (!sortDir) {
      setTokenList(tokens)
    }
  }, [sortDir, tokens])

  if (isLoadingSupportedCurrencies) {
    return <div>Loading</div>
  }

  // const data = sortDir ? tokenList : tokens
  // console.log(
  //   'rerender',
  //   sortDir,
  //   tokens[0].currencySymbol,
  //   data[0].currencySymbol
  // )

  return (
    <>
      <div className="flex justify-between mb-8 md:mb-4 sm:mb-0 items-center mt-4 md:px-4 sm:px-4 sm:py-4 sm:mt-0 md:sticky top-0 bg-white sm:shadow-lg shadow-gray-100">
        <h1 className="md:text-xl sm:text-sm text-2xl font-bold">
          Harga Crypto dalam Rupiah Hari Ini
        </h1>
        <div className="sm:bg-transparent flex bg-gray-200 rounded-lg py-3 px-4 items-center w-96 sm:w-auto">
          <IconSearch />
          <input
            className={`bg-gray-200  ml-4 flex-1 ${styles.input} sm:hidden`}
            placeholder="Cari aset di Pintu..."
          />
        </div>
      </div>
      <TokenListTable
        sortBy={sortBy}
        sortDir={sortDir}
        setSortBy={setSortBy}
        setSortDir={setSortDir}
      >
        {({ dateRange }) =>
          tokenList.map((currency, i) => {
            let adjustedIndex = i
            if (currency.currencyGroup === 'IDR') {
              adjustedIndex--
              return
            }

            return (
              <tr
                key={`token-${currency.currencySymbol}`}
                className={styles['table-row']}
              >
                <td>
                  <Link href={`${PATHS.MARKET}/${currency.currencySymbol}`}>
                    <div className="flex items-center">
                      <TokenIcon url={currency.logo} color={currency.color} />
                      <TokenName
                        name={currency.name}
                        symbol={currency.currencySymbol}
                      />
                    </div>
                  </Link>
                </td>
                <TokenListItem
                  i={adjustedIndex}
                  tokens={tokens}
                  dateRange={dateRange as DateRange}
                  currency={currency}
                  sortBy={sortBy}
                  sortDir={sortDir}
                  setTokenList={setTokenList}
                />
              </tr>
            )
          })
        }
      </TokenListTable>
    </>
  )
}

export default MarketPage
