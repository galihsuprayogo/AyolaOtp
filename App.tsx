import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome Home</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
