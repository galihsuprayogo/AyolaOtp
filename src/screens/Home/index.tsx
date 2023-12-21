import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

export const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#000' }}>Home Page</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
