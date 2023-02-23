import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../context/context'
import Header from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client"

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ContextProvider>
          <div>
            <Toaster />
            <Header />
            <Component {...pageProps} />
          </div>
        </ContextProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
