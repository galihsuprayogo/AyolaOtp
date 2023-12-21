import React, { forwardRef } from 'react'
import { Pressable, SafeAreaView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import type { TextInput as TextInputProps } from 'react-native'
import type { FormInputProps } from 'interfaces'
import { danger, gray, primary } from 'utils'

const FormInput = forwardRef<TextInputProps | any, FormInputProps>((props, ref) => {
  const { height, width } = useWindowDimensions()

  const onReturnRightIcon = () => {
    if (props.isHasRightIconChild) {
      return (
        <Pressable
          onPress={props.handleRightIcon}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
        >
          {props.iconRightChildren}
        </Pressable>
      )
    }
    return null
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: props.backgroundContainer ?? undefined,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom ?? undefined,
        paddingHorizontal: props.paddingXContainer ?? undefined,
        paddingVertical: props.paddingYContainer ?? undefined,
      }}
    >
      {props.isHasTitle && (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: props.fontSizeTitle ?? height * 0.019,
              fontWeight: '600',
              textAlign: 'left',
              paddingBottom: height * 0.011,
              color: gray[700],
            }}
          >
            {props.title}
          </Text>
          {props.isRequired ? (
            <Text
              style={{
                color: danger[500],
              }}
            >
              {' *'}
            </Text>
          ) : null}
        </View>
      )}

      <SafeAreaView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: props.backgroundColor,
          borderWidth: props.borderWidth,
          borderRadius: props.borderRadius,
          borderColor: props.borderColor,
          width: props.widthContainer,
        }}
      >
        {props.iconLeftChildren ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 50,
              left: 5,
              padding: 1,
            }}
          >
            {props.iconLeftChildren}
          </View>
        ) : null}
        <TextInput
          ref={ref}
          autoComplete={props.autoComplete ?? 'off'}
          autoCorrect={false}
          autoCapitalize={props.autoCapitalize ?? 'sentences'}
          editable={props.isEditable ?? true}
          keyboardType={props.keyboardType ?? 'default'}
          placeholder={props.placeholder}
          placeholderTextColor={props.color}
          secureTextEntry={props.showPassword}
          textAlignVertical='center'
          textAlign='left'
          value={props.value}
          onBlur={props.onBlurPressed}
          onChangeText={props.onChangeText}
          onFocus={props.onFocus}
          style={{
            height: props.height,
            width: props.widthTextInput,
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            borderRadius: props.borderRadius,
            color: props.color,
            fontSize: props.fontSize,
            fontFamily: props.fontFamily,
            paddingVertical: props.paddingY,
            paddingHorizontal: props.iconLeftChildren ? 0 : props.paddingX,
            paddingLeft: props.iconLeftChildren ? width * (28 / 361) : undefined,
            paddingRight: props.iconLeftChildren ? width * (16 / 361) : undefined,
          }}
        />
        {onReturnRightIcon()}
      </SafeAreaView>
      {props.errorMsg ? (
        <Text
          style={{
            fontSize: height * (12 / 801),
            color: primary[500],
            marginTop: height * (4 / 801),
          }}
        >
          {props.errorMsg}
        </Text>
      ) : null}
    </SafeAreaView>
  )
})

export default FormInput
