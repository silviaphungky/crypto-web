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
import { Shimmer } from '@components'
import { useRouter } from 'next/router'
import { TokenIconApi } from '@services/token-icon-api'
import arrayToObject from '@utils/arrayToObject'

const initToken = {
  color: '',
  currencyGroup: '',
  currencySymbol: '',
  decimal_point: 0,
  listingDate: '',
  logo: '',
  name: '',
  wallets: [
    {
      blockchain: '',
      blockchainName: '',
      currencyGroup: '',
      decimal_point: 0,
      explorer: '',
      listingDate: '',
      logo: '',
      tokenSymbol: '',
      tokenType: '',
    },
  ],
}

const MarketPage = () => {
  const router = useRouter()
  const [tokenList, setTokenList] = useState<Array<SupportedChangesResponse>>([
    initToken,
    initToken,
    initToken,
    initToken,
    initToken,
  ])
  const [sortBy, setSortBy] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | undefined>(undefined)

  const {
    data: supportedCurrencies,
    isLoading: isLoadingSupportedCurrencies,
    error: errorSupportedError,
  } = useQuery({
    queryKey: ['supportedCurrencies'],
    queryFn: WalletApi.getSupportedChanges,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tokens = useMemo(
    () =>
      (supportedCurrencies?.payload || []) as Array<SupportedChangesResponse>,
    [supportedCurrencies?.payload]
  )

  useEffect(() => {
    if (!sortDir) {
      setTokenList(tokens)
    }
  }, [sortDir, tokens])

  const handleRedirectToDetail = (path: string) => {
    router.push(path)
  }

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
                key={`token-${currency.currencySymbol}-${i}`}
                className={`${styles['table-row']} cursor-pointer`}
                onClick={() =>
                  handleRedirectToDetail(
                    `${PATHS.MARKET}/${currency.currencySymbol}`
                  )
                }
              >
                <td>
                  <div className="flex items-center">
                    <TokenIcon url={currency.logo} color={currency.color} />
                    {isLoadingSupportedCurrencies ? (
                      <Shimmer />
                    ) : (
                      <TokenName
                        name={currency.name}
                        symbol={currency.currencySymbol}
                      />
                    )}
                  </div>
                </td>
                <TokenListItem
                  i={adjustedIndex}
                  tokens={tokens}
                  dateRange={dateRange as DateRange}
                  currency={currency}
                  sortBy={sortBy}
                  sortDir={sortDir}
                  isLoadingSupportedCurrencies={isLoadingSupportedCurrencies}
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
