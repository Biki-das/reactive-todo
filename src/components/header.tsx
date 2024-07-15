import React from 'react'
import { Box, VStack, Heading } from 'native-base'

interface Props {
  title: string
  children: React.ReactNode
}

const Header = ({ title, children }: Props) => {
  return (
    <VStack h="300px" pb={5} bgColor="tertiary.600">
      {children}
      <Box flex={1} />
      <Heading color="white" p={5} size="xl">
        {title}
      </Heading>
    </VStack>
  )
}

export default Header
