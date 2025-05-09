/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { queryClient } from './src/utils/react-query'
import { MainApp } from './src/MainApp'

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainApp />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

export default App
