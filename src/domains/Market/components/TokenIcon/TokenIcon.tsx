import { memo } from 'react'
import Image from 'next/image'
import { RoundShimmer } from '@components'

import styles from './_TokenIcon.module.css'

const TokenIcon = ({ url, alt }: { url: string; alt: string }) => {
  return url ? (
    <Image className={styles.icon} src={url} alt={alt} width={35} height={35} />
  ) : (
    <RoundShimmer />
  )
}

export default memo(TokenIcon)
