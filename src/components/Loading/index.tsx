import React from 'react'
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  useWindowDimensions,
  Text,
  View,
} from 'react-native'
import { primary } from 'utils'

type LoadingComponentProps = {
  title?: string
  isVisible?: boolean
  zIndex?: number
}

const Loading = (props: LoadingComponentProps) => {
  const { height } = useWindowDimensions()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: props.zIndex ?? 5000,
      }}
    >
      <Modal visible={props.isVisible} animationType='none' transparent>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
              borderRadius: 8,
              padding: height * (27 / 801),
            }}
          >
            <ActivityIndicator size='large' color={primary[500]} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: height * (16 / 801),
                lineHeight: height * (30 / 801),
                color: '#000000',
                marginTop: height * (7 / 801),
              }}
            >
              {props.title ?? 'Loading...'}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Loading
