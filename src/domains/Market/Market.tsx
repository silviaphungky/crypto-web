'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { IconSearch } from '@components/icons'
import { TokenIcon, TokenListTable, TokenListItem } from './components'
import styles from './_Market.module.css'

import { PATHS } from '@constants/paths'

import { WalletApi } from '@services/wallet-api'
import { SupportedChangesResponse } from 'src/pages/api/supported-changes'

import { DateRange } from './components/TokenListTable/TokenListTable'

const MarketPage = () => {
  const {
    data: supportedCurrencies,
    isLoading: isLoadingSupportedCurrencies,
    error: errorSupportedError,
  } = useQuery({
    queryKey: ['supportedCurrencies'],
    queryFn: WalletApi.getSupportedChanges,
  })

  if (isLoadingSupportedCurrencies) {
    return <div>Loading</div>
  }

  const tokens = (supportedCurrencies.payload ||
    []) as Array<SupportedChangesResponse>

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
      <TokenListTable>
        {({ dateRange }) =>
          tokens.map((currency) => {
            if (currency.currencyGroup === 'IDR') return
            return (
              <tr
                key={`token-${currency.currencySymbol}`}
                className={styles['table-row']}
              >
                <td>
                  <Link href={`${PATHS.MARKET}/${currency.currencySymbol}`}>
                    <div className="flex items-center">
                      <TokenIcon url={currency.logo} color={currency.color} />
                      <div className="flex ml-6 flex-1 md:flex-col sm:flex-col">
                        <div className="flex-1 font-semibold">
                          {currency.name}
                        </div>
                        <div className="w-8 mx-6 text-gray-400 md:mx-0 sm:mx-0">
                          {currency.currencySymbol}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <TokenListItem
                  dateRange={dateRange as DateRange}
                  currency={currency}
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
