import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const SigninPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: '#000' }}>Signin Page</Text>
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
export default SigninPage
