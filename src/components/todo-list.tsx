import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import { TodoItem } from './todo-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TodoItemData {
  id: string
  subject: string
  done: boolean
}

interface TodoListProps {
  data: Array<TodoItemData>
  editingItemId: string | null
  onToggleItem: (item: TodoItemData) => void
  onChangeSubject: (item: TodoItemData, newSubject: string) => void
  onFinishedEditing: (item: TodoItemData) => void
  onPressLabel: (item: TodoItemData) => void
  onRemoveItem: (item: TodoItemData) => void
}

interface TodoItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TodoItemData
  isEditing: boolean
  onToggleItem: (item: TodoItemData) => void
  onChangeSubject: (item: TodoItemData, newSubject: string) => void
  onFinishedEditing: (item: TodoItemData) => void
  onPressLabel: (item: TodoItemData) => void
  onRemove: (item: TodoItemData) => void
}

export const AnimatedTodoItem = (props: TodoItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishedEditing,
    onPressLabel,
    onRemove
  } = props
  const handleToggleCheckBox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])
  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )

  const handlefinishedEditing = useCallback(() => {
    onFinishedEditing(data)
  }, [data, onFinishedEditing])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TodoItem
        isEditing={isEditing}
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        onToggleCheckBox={handleToggleCheckBox}
        onChangeSubject={handleChangeSubject}
        onFinishedEditing={handlefinishedEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function TodoList(props: TodoListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishedEditing,
    onPressLabel,
    onRemoveItem
  } = props

  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTodoItem
            key={item.id}
            data={item}
            isEditing={item.id === editingItemId}
            simultaneousHandlers={refScrollView}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishedEditing={onFinishedEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
