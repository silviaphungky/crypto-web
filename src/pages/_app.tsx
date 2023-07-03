import '@styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import App from 'next/app'
import { NextPage } from 'next'
import Providers from '@utils/provider'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Container = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
}

function MyApp({ ...props }: AppProps) {
  return <Container {...props} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
