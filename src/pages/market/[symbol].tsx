import { BasicLayout } from '@components/layout'
import CryptoDetailPage from '@domains/CryptoDetail/CryptpDetail'
import MarketPage from '@domains/Market'
import Head from 'next/head'

const CryptoDetail = () => {
  return (
    <>
      <Head>
        <meta name="description" content="MOST - Mandiri Sekuritas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Harga Crypto Hari Ini (IDR) | Pintu</title>
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:image"
          content="https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/pintu_thumbnail_card_6a039be9aa.png"
        ></meta>
        <meta
          property="twitter:image:alt"
          content="https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/pintu_thumbnail_card_6a039be9aa.png"
        ></meta>
        <meta
          property="og:image"
          content="https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/ic_launcher_1493da4144.png"
        ></meta>
        <meta
          name="description"
          content="Dapatkan update harga Crypto hari ini dalam kurs Rupiah (IDR). Cek pergerakan grafik market crypto dalam 24 jam secara realtime!"
        ></meta>
        <meta
          property="og:description"
          content="Dapatkan update harga Crypto hari ini dalam kurs Rupiah (IDR). Cek pergerakan grafik market crypto dalam 24 jam secara realtime!"
        ></meta>
      </Head>
      <CryptoDetailPage />
    </>
  )
}

CryptoDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}

export default CryptoDetail
