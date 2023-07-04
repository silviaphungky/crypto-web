import { memo } from 'react'

const TokenName = ({ name, symbol }: { name: string; symbol: string }) => {
  return (
    <div className="flex ml-6 flex-1 md:flex-col sm:flex-col">
      <div className="flex-1 font-semibold">{name}</div>
      <div className="w-8 mx-6 text-gray-400 md:mx-0 sm:mx-0">{symbol}</div>
    </div>
  )
}

export default memo(TokenName)
