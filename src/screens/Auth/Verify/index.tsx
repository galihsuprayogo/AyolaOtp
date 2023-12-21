import { type RouteProp, useRoute } from '@react-navigation/native'
import type { RootStackProps } from 'interfaces'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, useWindowDimensions } from 'react-native'

const VerifyPage = () => {
  const { height, width } = useWindowDimensions()
  const route = useRoute<RouteProp<RootStackProps, 'Verify'>>()

  console.log('Verify Page get params', route.params)

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
