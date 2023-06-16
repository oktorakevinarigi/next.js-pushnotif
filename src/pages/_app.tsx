import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { FirebaseCloudMessaging } from '@/components/firebase-cloud-messaging'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FirebaseCloudMessaging />
      <Component {...pageProps} />
    </>
  )
}
