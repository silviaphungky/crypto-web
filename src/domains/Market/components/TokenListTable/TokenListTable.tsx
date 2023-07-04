import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@components/icons'
import styles from './_TokenListTable.module.css'
import { Select } from '@components'

const OPTIONS = [
  { label: '24 JAM', value: 'day' },
  { label: '1 MGG', value: 'week' },
  { label: '1 BLN', value: 'month' },
  { label: '1 THN', value: 'year' },
]

export type DateRange = 'day' | 'week' | 'month' | 'year'

interface ChildrenProps {
  dateRange: DateRange
}

const SORT_KEY = {
  LATEST_PRICE: 'latestPrice',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
}

const TokenListTable = ({
  children,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
}: {
  children: (props: ChildrenProps) => ReactNode
  sortBy: string
  sortDir: 'asc' | 'desc' | undefined
  setSortBy: Dispatch<string>
  setSortDir: any
}) => {
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].value)
  const selectedOptionValue = OPTIONS.find((el) => el.value === selectedOption)
    ?.value as DateRange

  const handleChangeSort = (key: string) => {
    if (sortBy === key) {
      setSortDir((prevValue: any) => {
        if (!prevValue) return 'desc'

        return prevValue === 'desc' ? 'asc' : undefined
      })
    } else setSortDir('desc')
  }

  const getIconUpColor = (key: string) =>
    sortBy === key && sortDir === 'asc' ? '#0B0A0A' : undefined

  const getIconDownColor = (key: string) =>
    sortBy === key && sortDir === 'desc' ? '#0B0A0A' : undefined

  return (
    <table cellSpacing="0" cellPadding="0" className={styles.table}>
      <thead>
        <tr className={styles['table-head']}>
          <th className="text-gray-400 pl-11 sm:text-black">CRYPTO</th>
          <th className="text-gray-400 sm:text-black">
            <div className="sm:hidden">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setSortBy(SORT_KEY.LATEST_PRICE)
                  handleChangeSort(SORT_KEY.LATEST_PRICE)
                }}
              >
                <div>HARGA</div>

                <div className="flex flex-col gap-0.5">
                  <IconChevronUp
                    color={getIconUpColor(SORT_KEY.LATEST_PRICE)}
                  />
                  <IconChevronDown
                    color={getIconDownColor(SORT_KEY.LATEST_PRICE)}
                  />
                </div>
              </div>
            </div>
            <div className="md:hidden lg:hidden xl:hidden float-right">
              <Select
                value={OPTIONS[0].label}
                options={OPTIONS}
                onChange={setSelectedOption}
              />
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden cursor-pointer">
            <div
              className="flex items-center gap-2"
              onClick={() => {
                setSortBy(SORT_KEY.DAY)
                handleChangeSort(SORT_KEY.DAY)
              }}
            >
              <div>24 JAM</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp color={getIconUpColor(SORT_KEY.DAY)} />
                <IconChevronDown color={getIconDownColor(SORT_KEY.DAY)} />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSortBy(SORT_KEY.WEEK)
                handleChangeSort(SORT_KEY.WEEK)
              }}
            >
              <div>1 MGG</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp color={getIconUpColor(SORT_KEY.WEEK)} />
                <IconChevronDown color={getIconDownColor(SORT_KEY.WEEK)} />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSortBy(SORT_KEY.MONTH)
                handleChangeSort(SORT_KEY.MONTH)
              }}
            >
              <div>1 BLN</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp color={getIconUpColor(SORT_KEY.MONTH)} />
                <IconChevronDown color={getIconDownColor(SORT_KEY.MONTH)} />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSortBy(SORT_KEY.YEAR)
                handleChangeSort(SORT_KEY.YEAR)
              }}
            >
              <div>1 THN</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp color={getIconUpColor(SORT_KEY.YEAR)} />
                <IconChevronDown color={getIconDownColor(SORT_KEY.YEAR)} />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>{children({ dateRange: selectedOptionValue })}</tbody>
    </table>
  )
}

export default TokenListTable
