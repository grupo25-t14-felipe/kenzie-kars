import '@/styles/globals.css'
import '@/styles/typography.css'
import '@/styles/buttons.css'
import '@/styles/inputs.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
