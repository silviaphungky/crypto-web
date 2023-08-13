import { useQuery } from '@tanstack/react-query'

import { TokenIconApi } from '@services/token-icon-api'

import styles from './_TokenIcon.module.css'
import { memo } from 'react'

const TokenIcon = ({ url, color }: { url: string; color: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['icon', url],
    queryFn: () => TokenIconApi.get(url),
  })

  if (isLoading) {
    return <div className={styles.icon} style={{ color }} />
  }

  // console.log('dataaaaa', JSON.parse(data))

  return data ? (
    <div
      className={styles.icon}
      style={{ color }}
      data-src={url}
      dangerouslySetInnerHTML={{ __html: JSON.parse(data) }}
    />
  ) : (
    <img alt="" src="" />
  )
}

export default memo(TokenIcon)
