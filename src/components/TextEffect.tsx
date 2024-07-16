import * as React from 'react'
import { StyleProp, TextInput, TextStyle, View } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated'

const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&*()_+-=[]\;',./<>?:"{}|`

Animated.addWhitelistedNativeProps({
  text: true,
  value: true
})

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

type AnimatedTextProps = {
  text: SharedValue<string>
  style: StyleProp<TextStyle>
}

type WordProps = {
  char: string
  uppercase?: boolean
  shouldAnimate?: boolean
  style: StyleProp<TextStyle>
}

type HackerTextProps = {
  text: string
  style: StyleProp<TextStyle>
  uppercase?: boolean
}

const AnimatedText = ({ style, text }: AnimatedTextProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: String(text.value),
      defaultValue: String(text.value)
    }
  })

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={style}
      animatedProps={animatedProps}
    />
  )
}

const Word = ({ char, shouldAnimate, style, uppercase }: WordProps) => {
  const value = useSharedValue(0)
  const maxTimes = useSharedValue(Math.floor(Math.random() * 20) + 10)

  React.useEffect(() => {
    const random = () => Math.floor(Math.random() * (alphabet.length - 1))
    const randomTimeout = Math.floor(Math.random() * 30) + 20
    let times = 0
    let timeoutId: number | null = null

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const animate = () => {
      timeoutId = setTimeout(() => {
        if (times === maxTimes.value) {
          value.value = alphabet.indexOf(
            uppercase ? String(char).toUpperCase() : char
          )
          return
        }
        value.value = random()
        times += 1
        animate()
      }, randomTimeout)
    }

    if (shouldAnimate) {
      animate()
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
    // value.value = withTiming(random(), {duration: 1000, delay: 0});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char])

  const animatedChar = useDerivedValue(() => {
    // console.log(alphabet[value.value]);
    return alphabet[value.value] as string
  })

  return <AnimatedText text={animatedChar} style={style} />
}

export function HackerText({ text, style, uppercase }: HackerTextProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {text.split(' ').map((word, index) => {
        return (
          <View
            key={`word-${index}`}
            style={{
              flexDirection: 'row',
              marginRight: (style?.['fontSize'] ?? 16) / 2
            }}
          >
            {word.split('').map((char, index) => {
              return (
                <Word
                  key={`${char}-${index}`}
                  char={char}
                  style={style}
                  uppercase={uppercase}
                  shouldAnimate={
                    char.indexOf(`!@#$%^&*()_+-=[]\;',./<>?:"{}|`) === -1 ||
                    char === ' '
                  }
                />
              )
            })}
          </View>
        )
      })}
    </View>
  )
}
