import React, { type RefObject, useEffect, useRef, useState } from 'react'
import {
  type RouteProp,
  useRoute,
  useNavigation,
  type NavigationProp,
} from '@react-navigation/native'
import type { RootStackProps } from 'interfaces'
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  StatusBar,
  ScrollView,
  View,
  TextInput,
  Pressable,
} from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import {
  gray,
  primary,
  regexOnlyNumbers,
  secondsToMs,
  showSuccessMessage,
  showWarningMessage,
} from 'utils'
import { useDispatch } from 'react-redux'
import { setAuth } from 'states'

const VerifyPage = () => {
  const { height, width } = useWindowDimensions()
  const dispatch = useDispatch()
  const route = useRoute<RouteProp<RootStackProps, 'Verify'>>()
  const navigation = useNavigation<NavigationProp<RootStackProps, 'Verify'>>()
  const [isResendOtp, setIsResendOtp] = useState<boolean>(false)
  const [time, setTime] = useState<number>(30)
  const otpInputRef = useRef<Array<RefObject<TextInput> | any>>([
    { current: 0 },
    { current: 1 },
    { current: 2 },
    { current: 3 },
    { current: 4 },
    { current: 5 },
  ]).current
  const [otpValue, setOtpValue] = useState<Array<{ value: string }>>([
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ])

  useEffect(() => {
    setIsResendOtp(true)
  }, [])

  useEffect(() => {
    if (isResendOtp) {
      let base = 31
      const interval = setInterval(() => {
        base -= 1
        setTime(base)
        if (base < 0) {
          setIsResendOtp(false)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isResendOtp])

  useBackHandler(() => {
    onBackAction()
    return true
  })

  const onBackAction = () => {
    navigation.goBack()
  }

  const onResetOTP = () => {
    setOtpValue([
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' },
    ])
    otpInputRef[0].current?.focus()
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * (16 / 361),
        backgroundColor: '#FFFFFF',
      }}
    >
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backfaceVisibility: 'hidden',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          backfaceVisibility: 'hidden',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: height * (24 / 801),
          }}
        >
          <Text
            style={{
              fontSize: height * (21 / 801),
              fontWeight: '700',
              color: '#000000',
            }}
          >
            Enter authentication code
          </Text>
          <Text
            style={{
              fontSize: height * (15 / 801),
              fontWeight: '400',
              color: gray[500],
              marginTop: height * (10 / 801),
              textAlign: 'center',
              maxWidth: '90%',
              lineHeight: height * (23 / 801),
            }}
          >
            {`Enter the 6-digit that we have sent via the phone number to +62 882-2569-000`}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: height * (8 / 801),
          }}
        >
          {otpValue.map((item, index) => (
            <TextInput
              ref={otpInputRef[index]}
              key={index}
              autoFocus={index === 0}
              placeholder='0'
              placeholderTextColor={gray[300]}
              style={{
                flex: 1,
                textAlign: 'center',
                width: 48,
                height: 48,
                borderWidth: 1,
                borderRadius: 48 / 2,
                borderColor: gray[300],
                color: gray[500],
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: height * (20 / 801),
                fontWeight: '500',
                marginHorizontal: height * (5 / 801),
              }}
              keyboardType='number-pad'
              value={item.value}
              maxLength={1}
              numberOfLines={1}
              onChangeText={(value) => {
                const temp = [...otpValue]
                if (regexOnlyNumbers(value)) {
                  temp[index].value = value
                  setOtpValue(temp)
                  if (otpValue[index].value !== '' && otpValue.length - 1 !== index) {
                    otpInputRef[index + 1].current?.focus()
                  } else {
                    otpInputRef[otpValue.length - 1].current?.blur()
                  }
                }
                if (value === '') {
                  temp[index].value = value
                  setOtpValue(temp)
                  if (index !== 0) {
                    otpInputRef[index - 1].current?.focus()
                  }
                }
                // last index & check if OTP is 111111
                if (otpValue.length - 1 === index) {
                  if (!otpValue.find((item) => item.value === '')) {
                    let strOtp: string = ''
                    otpValue.map((item, index) => (strOtp += item.value))
                    if (strOtp === '111111') {
                      dispatch(
                        setAuth({
                          username: route.params.username,
                          email: route.params.email,
                          password: route.params.password,
                        })
                      )
                      showSuccessMessage({
                        title: 'Registered',
                        desc: 'Sucessfully registered user, fill username & password to continue to the App',
                        duration: 3000,
                      })
                      navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
                    } else {
                      showWarningMessage({
                        title: 'Wrong OTP',
                        desc: 'OTP is incorret, click Resend Code button to get a new OTP Code',
                        duration: 3000,
                      })
                    }
                  } else {
                    showWarningMessage({
                      title: 'Information',
                      desc: 'There is an unfilled OTP form. Please fill completely.',
                      duration: 2000,
                    })
                  }
                }
              }}
            />
          ))}
        </View>
        <View
          style={{
            marginTop: height * (100 / 801),
          }}
        >
          <Text
            style={{
              fontSize: height * (15 / 801),
              fontWeight: '400',
              color: gray[300],
              textAlign: 'center',
              backgroundColor: 'transparent',
            }}
          >
            {`${
              isResendOtp ? `${time === undefined || time < 0 ? '' : `(${secondsToMs(time)})`}` : ''
            }`}
          </Text>
          <Pressable
            style={{
              marginTop: height * (8 / 801),
            }}
            onPress={() => {
              if (!isResendOtp) {
                setIsResendOtp(true)
                onResetOTP()
                showSuccessMessage({
                  title: 'Resend OTP',
                  desc: 'OTP Code successfully resend to your phone number',
                  duration: 2000,
                })
              }
            }}
          >
            <Text
              style={{
                fontSize: height * (16 / 801),
                fontWeight: '700',
                color: isResendOtp ? gray[500] : primary[500],
                textAlign: 'center',
              }}
            >
              Resend Code
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VerifyPage
