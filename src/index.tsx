import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main'
import AboutScreen from './screens/aboutscreen'
import { registerRootComponent } from 'expo'
import Sidebar from './components/sidebar'
import { bootCryptoPolyfill } from './utils/crypto-polyfill'

bootCryptoPolyfill()

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default App
registerRootComponent(App)
