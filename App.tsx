import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AppContainer from './src/components/container'
import Navigator from './src/'
import { bootCryptoPolyfill } from './src/utils/crypto-polyfill'

export default function App() {
  bootCryptoPolyfill()
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
