import { Orderbook, RunningTrade } from '@components'
import { ReactNode, useState } from 'react'

type TabTypes = 'orderbook' | 'trades' | 'info'

const TABS: Array<{ id: TabTypes; value: string }> = [
  { id: 'orderbook', value: 'Order Book' },
  { id: 'trades', value: 'Trades' },
  { id: 'info', value: 'Info' },
]

interface Props {
  currency: string
}

const CryptoDetailTabs = ({ currency }: Props) => {
  const [selectedTab, setSelectedTab] = useState<{
    id: TabTypes
    value: string
  }>(TABS[0])

  const TAB_ITEMS: { [key in TabTypes]: ReactNode } = {
    orderbook: <Orderbook />,
    trades: <RunningTrade currency={currency} />,
    info: <div>info</div>,
  }

  const handleChangeTab = (tab: { id: TabTypes; value: string }) => {
    setSelectedTab(tab)
  }

  const tabActiveStyle =
    'border-b-2 border-yellowPrimary font-bold text-yellowPrimary'
  const tabInActiveStyle = ' border-b-2 border-gray-300'

  return (
    <>
      <div className="flex mb-4">
        {TABS.map((item) => {
          const isActive = selectedTab.id === item.id
          return (
            <div
              className={`flex-1 text-center p-1 cursor-pointer border-solid ${
                isActive ? tabActiveStyle : tabInActiveStyle
              }`}
              key={`tab-${item.id}`}
              onClick={() => handleChangeTab(item)}
            >
              {item.value}
            </div>
          )
        })}
      </div>
      {TAB_ITEMS[selectedTab.id]}
    </>
  )
}

export default CryptoDetailTabs
