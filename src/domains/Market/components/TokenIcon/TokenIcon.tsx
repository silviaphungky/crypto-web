import styles from './_TokenIcon.module.css'
import { memo } from 'react'
import Image from 'next/image'
import { Shimmer } from '@components'

const TokenIcon = ({ url, alt }: { url: string; alt: string }) => {
  return url ? (
    <Image className={styles.icon} src={url} alt={alt} width={35} height={35} />
  ) : (
    <Shimmer />
  )
}

export default memo(TokenIcon)
