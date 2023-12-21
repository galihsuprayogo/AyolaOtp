import React, { type RefObject, useRef, useState } from 'react'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { type RootStackProps } from 'interfaces'
import {
  SafeAreaView,
  Text,
  type TextInput,
  useWindowDimensions,
  StatusBar,
  ScrollView,
} from 'react-native'
import { ButtonGlobal, FormInput } from 'components'
import { gray, primary, regexEmail, regexPassword } from 'utils'
import { IconVisibility, IconVisibilityOff } from 'assets'
import _ from 'lodash'

const RegisterPage = () => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProp<RootStackProps, 'Register'>>()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const formRef = useRef<Array<RefObject<TextInput> | any>>([
    { current: 0 },
    { current: 1 },
    { current: 2 },
  ]).current
  const [form, setForm] = useState<{
    username?: {
      value?: string
      focus?: boolean
      msg?: string
    }
    email?: {
      value?: string
      focus?: boolean
      msg?: string
    }
    pwd?: {
      value?: string
      focus?: boolean
      msg?: string
    }
  }>()

  const onChangeUsername = (value: string) => {
    if (value.trim()) {
      setForm({
        username: { ...form?.username, value, msg: undefined },
        email: { ...form?.email },
        pwd: { ...form?.pwd },
      })
    } else {
      setForm({
        username: { ...form?.username, value, msg: '*Silahkan Masukkan Username' },
        email: { ...form?.email },
        pwd: { ...form?.pwd },
      })
    }
  }

  const onChangeEmail = (value: string) => {
    if (value.trim()) {
      if (regexEmail(value.trim())) {
        setForm({
          email: { ...form?.email, msg: undefined, value },
          username: { ...form?.username },
          pwd: { ...form?.pwd },
        })
      } else {
        setForm({
          email: {
            ...form?.email,
            msg: '*Format email belum benar (email@example.com)',
            value,
          },
          username: { ...form?.username },
          pwd: { ...form?.pwd },
        })
      }
    } else {
      setForm({
        email: { ...form?.email, msg: '*Silahkan Masukkan Email', value },
        username: { ...form?.username },
        pwd: { ...form?.pwd },
      })
    }
  }
  const onChangePwd = (value: string) => {
    if (value.trim()) {
      if (regexPassword(value.trim())) {
        setForm({
          pwd: { ...form?.pwd, msg: undefined, value },
          email: { ...form?.email },
          username: { ...form?.username },
        })
      } else {
        setForm({
          pwd: {
            ...form?.pwd,
            msg: '*Min 8 char, contain uppercase, lowercase, & symbol',
            value,
          },
          email: { ...form?.email },
          username: { ...form?.username },
        })
      }
    } else {
      setForm({
        pwd: { ...form?.pwd, msg: '*Silahkan Masukkan Password', value },
        username: { ...form?.username },
        email: { ...form?.email },
      })
    }
  }

  const onRegister = () => {
    if (form?.username?.value?.trim() && form?.email?.value?.trim() && form?.pwd?.value?.trim()) {
      if (!form.username.msg && !form?.email?.msg && !form?.pwd?.msg) {
        navigation.navigate('Verify', {
          username: form.username.value,
          email: form.email.value,
          password: form.pwd.value,
        })
      }
    }
    setForm({
      username: {
        ...form?.username,
        msg: form?.username?.value ? undefined : '*Silahkan Masukkan Username',
        value: form?.username?.value,
      },
      email: {
        ...form?.email,
        msg: form?.email?.value ? undefined : '*Silahkan Masukkan Email',
        value: form?.email?.value,
      },
      pwd: {
        ...form?.pwd,
        msg: form?.pwd?.value ? undefined : '*Silahkan Masukkan Password',
        value: form?.pwd?.value,
      },
    })
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
        <Text
          style={{
            fontSize: height * (21 / 801),
            fontWeight: '700',
            color: '#000000',
            textAlign: 'left',
            marginBottom: height * (18 / 801),
          }}
        >
          Register to Ayola
        </Text>
        <FormInput
          ref={formRef[0]}
          autoComplete='username'
          autoCapitalize='none'
          widthContainer='100%'
          widthTextInput='100%'
          color={gray[500]}
          backgroundColor='#FFFFFF'
          borderWidth={1}
          borderRadius={height * (8 / 801)}
          borderColor={form?.username?.focus ? primary[500] : gray[300]}
          errorMsg={form?.username?.msg}
          height={height * (50 / 801)}
          placeholder='username'
          isHasTitle
          title='Username'
          fontSize={height * 0.0171}
          paddingX={6}
          value={form?.username?.value}
          onChangeText={(value) => onChangeUsername(value)}
          onFocus={() =>
            setForm({
              username: { ...form?.username, focus: true },
              email: { ...form?.email },
              pwd: { ...form?.pwd },
            })
          }
          onBlurPressed={() =>
            setForm({
              username: { ...form?.username, focus: false },
              email: { ...form?.email },
              pwd: { ...form?.pwd },
            })
          }
        />
        <FormInput
          ref={formRef[1]}
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
          marginTop={height * 0.018}
          value={form?.email?.value}
          onChangeText={(value) => onChangeEmail(value)}
          onFocus={() =>
            setForm({
              email: { ...form?.email, focus: true },
              username: { ...form?.username },
              pwd: { ...form?.pwd },
            })
          }
          onBlurPressed={() =>
            setForm({
              email: { ...form?.email, focus: false },
              username: { ...form?.username },
              pwd: { ...form?.pwd },
            })
          }
        />
        <FormInput
          ref={formRef[2]}
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
          value={form?.pwd?.value}
          onChangeText={(value) => onChangePwd(value)}
          onFocus={() =>
            setForm({
              pwd: { ...form?.pwd, focus: true },
              username: { ...form?.username },
              email: { ...form?.email },
            })
          }
          onBlurPressed={() =>
            setForm({
              pwd: { ...form?.pwd, focus: false },
              username: { ...form?.username },
              email: { ...form?.email },
            })
          }
        />
        <ButtonGlobal
          title='Register'
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
              onRegister()
            })()
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterPage
