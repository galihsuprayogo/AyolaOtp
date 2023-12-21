import React, { type RefObject, useRef, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  type TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import { IconVisibility, IconVisibilityOff, ImgAyola } from 'assets'
import FastImage from 'react-native-fast-image'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import type { RootStackProps } from 'interfaces'
import { ButtonGlobal, FormInput } from 'components'
import { gray, primary } from 'utils'
import _ from 'lodash'

const SigninPage = () => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProp<RootStackProps, 'Signin'>>()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const formRef = useRef<Array<RefObject<TextInput> | any>>([
    { current: 0 },
    { current: 1 },
  ]).current
  const [form, setForm] = useState<{
    email?: {
      email?: string
      focus?: boolean
      msg?: string
    }
    pwd?: {
      pwd?: string
      focus?: boolean
      msg?: string
    }
  }>()

  const onChangeEmail = (value: string) => {
    const rgxEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/
    if (value.trim()) {
      if (rgxEmail.test(value.trim())) {
        setForm({ email: { ...form?.email, msg: undefined, email: value }, pwd: { ...form?.pwd } })
      } else {
        setForm({
          email: {
            ...form?.email,
            msg: '*Format email belum benar (email@example.com)',
            email: value,
          },
          pwd: { ...form?.pwd },
        })
      }
    } else {
      setForm({
        email: { ...form?.email, msg: '*Silahkan Masukkan Email', email: value },
        pwd: { ...form?.pwd },
      })
    }
  }

  const onChangePwd = (value: string) => {
    if (value) {
      if (value.length < 8) {
        setForm({
          pwd: { ...form?.pwd, msg: '*Minimum 8 karakter', pwd: value },
          email: { ...form?.email },
        })
      } else {
        setForm({ pwd: { ...form?.pwd, msg: undefined, pwd: value }, email: { ...form?.email } })
      }
    } else {
      setForm({
        pwd: { ...form?.pwd, msg: '*Silahkan Masukkan Password', pwd: value },
        email: { ...form?.email },
      })
    }
  }

  const onContinue = () => {}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * (16 / 361),
        backgroundColor: '#FFFFFF',
      }}
    >
      <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
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
            marginBottom: height * 0.031,
          }}
        >
          <FastImage
            style={{
              height: height * (80 / 801),
              width: width * (155 / 361),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode='contain'
            source={ImgAyola}
          />
          <Text
            style={{
              fontSize: height * (18 / 801),
              fontWeight: '700',
              color: '#000000',
            }}
          >
            Login to Ayola
          </Text>
        </View>
        <FormInput
          ref={formRef[0]}
          autoComplete='email'
          autoCapitalize='none'
          widthContainer='100%'
          widthTextInput='100%'
          color={gray[500]}
          backgroundColor='#FFFFFF'
          borderWidth={1}
          borderRadius={height * (8 / 801)}
          borderColor={form?.email?.focus ? primary[500] : gray[300]}
          errorMsg={form?.email?.msg}
          height={height * (50 / 801)}
          placeholder='email@example.com'
          isHasTitle
          title='Email'
          fontSize={height * 0.0171}
          paddingX={6}
          value={form?.email?.email}
          onChangeText={(value) => onChangeEmail(value)}
          onFocus={() => setForm({ email: { ...form?.email, focus: true }, pwd: { ...form?.pwd } })}
          onBlurPressed={() =>
            setForm({ email: { ...form?.email, focus: false }, pwd: { ...form?.pwd } })
          }
        />
        <FormInput
          ref={formRef[1]}
          autoCapitalize='none'
          autoComplete='password'
          widthContainer='100%'
          widthTextInput='90%'
          color={gray[500]}
          backgroundColor='#FFFFFF'
          borderWidth={1}
          borderRadius={height * (8 / 801)}
          borderColor={form?.pwd?.focus ? primary[500] : gray[300]}
          errorMsg={form?.pwd?.msg}
          height={height * (50 / 801)}
          placeholder='******'
          isHasTitle
          title='Password'
          fontSize={height * 0.0171}
          paddingX={6}
          marginTop={height * 0.018}
          showPassword={showPassword}
          isHasRightIconChild
          iconRightChildren={
            showPassword ? (
              <IconVisibility
                height={18}
                width={18}
                fill={`${form?.pwd?.focus ? primary[500] : '#98A2B3'}`}
              />
            ) : (
              <IconVisibilityOff
                height={18}
                width={18}
                fill={`${form?.pwd?.focus ? primary[500] : '#98A2B3'}`}
              />
            )
          }
          handleRightIcon={() => setShowPassword(!showPassword)}
          value={form?.pwd?.pwd}
          onChangeText={(value) => onChangePwd(value)}
          onFocus={() => setForm({ pwd: { ...form?.pwd, focus: true }, email: { ...form?.email } })}
          onBlurPressed={() =>
            setForm({ pwd: { ...form?.pwd, focus: false }, email: { ...form?.email } })
          }
        />
        <ButtonGlobal
          title='Masuk'
          titleColor='#FFFFFF'
          titleFontSize={height * (16 / 801)}
          backgroundColor={primary[500]}
          width='100%'
          height={height * (44 / 801)}
          borderRadius={height * (8 / 801)}
          marginTop={height * (24 / 801)}
          marginBottom={height * (16 / 801)}
          onPress={() =>
            _.throttle(() => {
              onContinue()
            })()
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SigninPage
