import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const VerifyPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#000' }}>Verify Page</Text>
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
export default VerifyPage
