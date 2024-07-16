import * as React from 'react'
import {
  Text,
  Box,
  Center,
  VStack,
  Fab,
  Icon,
  themeTools,
  useTheme,
  useColorMode,
  useColorModeValue,
  Button,
  Input,
  View
} from 'native-base'
import ThemeSwitch from '../components/theme-switcher'
import { Replicache, TEST_LICENSE_KEY } from 'replicache'
import TodoList from '../components/todo-list'
import AnimatedColorBox from '../components/colorbox'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'
import Header from '../components/header'
import NavBar from '../components/navbar'

import { useSubscribe } from 'replicache-react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createReplicacheExpoSQLiteExperimentalCreateKVStore } from '@react-native-replicache/react-native-expo-sqlite'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Finish homework',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Go to the gym',
    done: false
  }
]

export default function MainScreen() {
  const token = AsyncStorage.getItem('userToken')
  const [data, setData] = React.useState(initialData)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const [r, setR] = React.useState(null)
  const handleToggleTaskItem = React.useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.map((todo) =>
        todo.id === item.id ? { ...todo, done: !todo.done } : todo
      )
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = React.useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = prevData.map((todo) =>
        todo.id === item.id ? { ...todo, subject: newSubject } : todo
      )
      return newData
    })
  }, [])
  const handleFinishEditingTaskItem = React.useCallback((_item) => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = React.useCallback((item) => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = React.useCallback((item) => {
    setData((prevData) => prevData.filter((i) => i !== item))
  }, [])
  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos', e)
    }
  }

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('@todos')
      return storedTodos != null ? JSON.parse(storedTodos) : initialData
    } catch (e) {
      console.error('Failed to load todos', e)
      return initialData
    }
  }

  React.useEffect(() => {
    loadTodos().then(setData)
    AsyncStorage.setItem(
      'userToken',
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0MGY1MTNmLTdkNjAtNDQ1Yy1hMzNiLTE4NzM4MDMwYmFkMCIsInVzZXJuYW1lIjoiYmFrZSIsImlhdCI6MTcyMTE0MDY4N30.3jZOjgp_7oPxLjCWnNwZT6w4vczmY9P4JU-jFCsqCnA`
    )
  }, [])

  // Save todos whenever data changes
  React.useEffect(() => {
    saveTodos(data)
  }, [data])

  // some use with the react native replicache library
  // which makes the pull not recieve any data

  React.useEffect(() => {
    const r = new Replicache({
      name: 'chat-user-id',
      licenseKey: TEST_LICENSE_KEY,
      mutators: {},
      pushURL: `https://todo-api-ixpx.onrender.com/api/replicache/push`,
      pullURL: `https://todo-api-ixpx.onrender.com/api/replicache/pull`,
      auth: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0MGY1MTNmLTdkNjAtNDQ1Yy1hMzNiLTE4NzM4MDMwYmFkMCIsInVzZXJuYW1lIjoiYmFrZSIsImlhdCI6MTcyMTE0MDY4N30.3jZOjgp_7oPxLjCWnNwZT6w4vczmY9P4JU-jFCsqCnA`}`,
      experimentalCreateKVStore:
        createReplicacheExpoSQLiteExperimentalCreateKVStore
    })
    setR(r)
    return () => {
      void r.close()
    }
  }, [])

  const messages = useSubscribe(
    r,
    async (tx) => {
      const list = await tx.scan({ prefix: 'message/' }).entries().toArray()
      list.sort(([, { order: a }], [, { order: b }]) => a - b)
      console.log(list)
      return list
    },
    { default: [] }
  )

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Header title="Welcome to Reactive Todo">
        <NavBar />
      </Header>
      <View></View>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TodoList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishedEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={async () => {
          const id = shortid.generate()
          setData((prevData) => [
            {
              id,
              subject: '',
              done: false
            },
            ...prevData
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
