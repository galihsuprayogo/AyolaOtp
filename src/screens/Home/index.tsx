import _ from 'lodash'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { selectAuthState } from 'states'
import { gray } from 'utils'

export const HomePage = () => {
  const { height } = useWindowDimensions()
  const user = useSelector(selectAuthState)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
      <Text style={{ color: gray[700], fontSize: height * (31 / 801), fontWeight: '700' }}>
        {`Welcome Home`}
      </Text>
      <Text
        style={{
          color: gray[700],
          fontSize: height * (27 / 801),
          fontWeight: '600',
          marginTop: height * (8 / 801),
        }}
      >
        {_.startCase(user.username)}
      </Text>
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
