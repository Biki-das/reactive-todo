import { HackerText } from './TextEffect'
import Constants from 'expo-constants'
import * as React from 'react'
import { StatusBar, StyleSheet, View, Platform } from 'react-native'

const sentence = [
  `A todo App`,
  `Made with love by @Biki`,
  `Using Expo and Reanimated`
]
const subtitles = [
  `- _ - _ - _ -`,
  `Follow me on Twitter for more`,
  `. . . . . . . . . . . . . . .`
]

export default function App() {
  const [index, setIndex] = React.useState(0)
  const timer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const changeSentence = () => {
      timer.current = setTimeout(() => {
        setIndex((index) => {
          return (index + 1) % sentence.length
        })
        changeSentence()
      }, 3000)
    }

    changeSentence()

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  // Determine the font family based on the platform
  const fontFamily = Platform.OS === 'ios' ? 'Menlo' : 'default'

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <HackerText
        text={sentence[index] as string}
        style={{
          fontSize: 20,
          fontFamily: fontFamily,
          fontWeight: 'bold'
        }}
        uppercase
      />

      <HackerText
        text={subtitles[index] as string}
        style={{
          marginTop: 10,
          fontSize: 14,
          fontFamily: fontFamily,
          opacity: 0.7
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 16
  }
})
