# React Native Todo App

A feature-rich todo list application built with React Native, featuring task management, dark mode, and smooth animations.

![App Demo](./assets/ScreenRecording_02-21-2025%2000-44-53_1.MP4)

## Features

- ✅ Add new tasks with text input
- ✅ Mark tasks as completed
- ✅ Edit existing tasks
- ✅ Delete tasks with swipe gesture
- ✅ Persistent storage using AsyncStorage
- 🌗 Dark mode support
- 🔄 Task filtering (All/Active/Completed)
- ✨ Smooth animations for better UX

## Technologies Used

- React Native
- AsyncStorage for data persistence
- Context API for state management
- React Native Animated for transitions
- React Native Gesture Handler for swipe actions

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Biki-das/reactive-todo
cd react-native-todo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:

```bash
# For iOS
npm run ios
# For Android
npm run android
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── screens/           # App screens
├── storage/           # AsyncStorage utilities
├── styles/           # Theme and shared styles
└── utils/            # Helper functions
```

## Usage

### Adding a Task

- Type your task in the input field
- Press the "+" button or hit enter

### Completing a Task

- Tap the checkbox in front of the task
- Task will be marked as completed with a strikethrough

### Editing a Task

- Tap on the task text
- Edit the text in the input field
- Save changes

### Deleting a Task

- Swipe left on a task to reveal delete option
- Tap delete or complete the swipe to remove

### Dark Mode

- Toggle dark mode using the theme switch in settings
