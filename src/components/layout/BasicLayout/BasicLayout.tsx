import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const BasicLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-5xl sm:max-w-none md:max-w-none">
      {children}
    </div>
  )
}

export default BasicLayout
