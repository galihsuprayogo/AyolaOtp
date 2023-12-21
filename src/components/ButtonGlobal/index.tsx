import React from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import type { ButtonGlobalProps } from 'interfaces'

const ButtonGlobal = (props: ButtonGlobalProps) => {
  const { height, width } = useWindowDimensions()

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
      }}
    >
      {props.iconLeftChildren ? (
        <View
          style={{
            marginHorizontal: width * (8 / 361),
          }}
        >
          {props.iconLeftChildren}
        </View>
      ) : null}
      <Text
        style={{
          color: props.titleColor,
          textAlign: 'center',
          fontSize: props.titleFontSize,
          fontFamily: props.titleFontFamily,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  )
}

export default ButtonGlobal
