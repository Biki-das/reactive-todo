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
  Input
} from 'native-base'
import ThemeSwitch from '../components/theme-switcher'

import { TodoItem } from '../components/todo-item'
import TodoList from '../components/todo-list'
import AnimatedColorBox from '../components/colorbox'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'
import Header from '../components/header'
import NavBar from '../components/navbar'

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
  const [data, setData] = React.useState(initialData)
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const handleToggleTaskItem = React.useCallback((item) => {
    setData((prevData) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = React.useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
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
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Header title="Welcome to Reactive Todo">
        <NavBar />
      </Header>
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
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
