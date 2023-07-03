import { ReactNode, useState } from 'react'
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

const TokenListTable = ({
  children,
}: {
  children: (props: ChildrenProps) => ReactNode
}) => {
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0].value)
  const selectedOptionValue = OPTIONS.find((el) => el.value === selectedOption)
    ?.value as DateRange
  return (
    <table cellSpacing="0" cellPadding="0" className={styles.table}>
      <thead>
        <tr className={styles['table-head']}>
          <th className="text-gray-400 pl-11 sm:text-black">CRYPTO</th>
          <th className="text-gray-400 sm:text-black">
            <div className="sm:hidden">
              <div className="flex items-center gap-2">
                <div>HARGA</div>

                <div className="flex flex-col gap-0.5">
                  <IconChevronUp />
                  <IconChevronDown />
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
          <th className="text-gray-400 text-center sm:hidden">
            <div className="flex items-center gap-2">
              <div>24 JAM</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp />
                <IconChevronDown />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div className="flex items-center gap-2">
              <div>1 MGG</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp />
                <IconChevronDown />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div className="flex items-center gap-2">
              <div>1 BLN</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp />
                <IconChevronDown />
              </div>
            </div>
          </th>
          <th className="text-gray-400 text-center sm:hidden">
            <div className="flex items-center gap-2">
              <div>1 THN</div>

              <div className="flex flex-col gap-0.5">
                <IconChevronUp />
                <IconChevronDown />
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
