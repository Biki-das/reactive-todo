import React from 'react'
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Image,
  useColorModeValue
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/colorbox'
import Navbar from '../components/navbar'
import Header from '../components/header'
import { HackerText } from '../components/TextEffect'
import Constants from 'expo-constants'
import { StatusBar, StyleSheet, View } from 'react-native'

const sentence = [
  // 'Be yourself; everyone else is already taken.',
  `A todo App`,
  // `A room without books is like a body without a soul.`,
  `Made with love by @Biki`,
  `Using Expo and Reanimated`
]
const subtitles = [
  // 'Be yourself; everyone else is already taken.',
  `- _ - _ - _ -`,
  // `A room without books is like a body without a soul.`,
  `Follow me on Twitter for more`,
  `. . . . . . . . . . . . . . .`
]

const AboutScreen = () => {
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
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Header title="About this app">
        <Navbar />
      </Header>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center"></Box>
        </VStack>
        <HackerText
          text={sentence[index] as string}
          style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
          uppercase
        />

        <HackerText
          text={subtitles[index] as string}
          style={{
            marginTop: 10,
            fontSize: 14,
            opacity: 0.7
          }}
          // uppercase
        />
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
