import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import PlayerLayout from '../components/PlayerLayout'
import { store } from '../lib/store'
import 'reset-css'

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider>
    <StoreProvider store={store}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </StoreProvider>
  </ChakraProvider>
)

export default MyApp
