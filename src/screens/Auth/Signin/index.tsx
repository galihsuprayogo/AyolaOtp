import React, { type RefObject, useRef, useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  type TextInput,
  View,
  useWindowDimensions,
  Pressable,
} from 'react-native'
import { IconVisibility, IconVisibilityOff, ImgAyola } from 'assets'
import FastImage from 'react-native-fast-image'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import type { AuthProps, RootStackProps } from 'interfaces'
import { ButtonGlobal, FormInput } from 'components'
import { gray, primary, regexPassword, showWarningMessage } from 'utils'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, setAuth } from 'states'

const SigninPage = () => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation<NavigationProp<RootStackProps, 'Signin'>>()
  const dispatch = useDispatch()
  const auth: AuthProps = useSelector(selectAuthState)
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [isLoadingHelper, setIsLoadingHelper] = useState<boolean>(true)
  const formRef = useRef<Array<RefObject<TextInput> | any>>([
    { current: 0 },
    { current: 1 },
  ]).current
  const [form, setForm] = useState<{
    username?: {
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

  useEffect(() => {
    setIsLoadingHelper(true)
    const mount = setTimeout(() => {
      if (auth.token) {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
      }
      setIsLoadingHelper(false)
    })
    return () => clearTimeout(mount)
  }, [])

  const onChangeUsername = (value: string) => {
    if (value.trim()) {
      setForm({
        username: { ...form?.username, value, msg: undefined },
        pwd: { ...form?.pwd },
      })
    } else {
      setForm({
        username: { ...form?.username, value, msg: '*Silahkan Masukkan Username' },
        pwd: { ...form?.pwd },
      })
    }
  }

  const onChangePwd = (value: string) => {
    if (value.trim()) {
      if (regexPassword(value.trim())) {
        setForm({
          pwd: { ...form?.pwd, msg: undefined, value },
          username: { ...form?.username },
        })
      } else {
        setForm({
          pwd: {
            ...form?.pwd,
            msg: '*Min 8 char, contain uppercase, lowercase, & symbol',
            value,
          },
          username: { ...form?.username },
        })
      }
    } else {
      setForm({
        pwd: { ...form?.pwd, msg: '*Silahkan Masukkan Password', value },
        username: { ...form?.username },
      })
    }
  }

  const onContinue = () => {
    if (form?.username?.value?.trim() && form?.pwd?.value?.trim()) {
      if (!form.username.msg && !form?.pwd?.msg) {
        if (auth.username) {
          if (
            auth.username === form.username.value.trim() &&
            auth.password === form.pwd.value.trim()
          ) {
            dispatch(setAuth({ token: 'asd' }))
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
          } else {
            showWarningMessage({
              title: 'Information',
              desc: 'Username/Password doesnt match',
              duration: 2000,
            })
          }
        } else {
          showWarningMessage({
            title: 'Information',
            desc: 'User is not registered, please register first!',
            duration: 2000,
          })
        }
      }
    }
    setForm({
      username: {
        ...form?.username,
        msg: form?.username?.value ? undefined : '*Silahkan Masukkan Username',
        value: form?.username?.value,
      },
      pwd: {
        ...form?.pwd,
        msg: form?.pwd?.value ? undefined : '*Silahkan Masukkan Password',
        value: form?.pwd?.value,
      },
    })
  }

  return isLoadingHelper ? null : (
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
              pwd: { ...form?.pwd },
            })
          }
          onBlurPressed={() =>
            setForm({
              username: { ...form?.username, focus: false },
              pwd: { ...form?.pwd },
            })
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
          value={form?.pwd?.value}
          onChangeText={(value) => onChangePwd(value)}
          onFocus={() =>
            setForm({ pwd: { ...form?.pwd, focus: true }, username: { ...form?.username } })
          }
          onBlurPressed={() =>
            setForm({ pwd: { ...form?.pwd, focus: false }, username: { ...form?.username } })
          }
        />
        <View>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: height * (14 / 801),
                color: gray[500],
                textAlign: 'center',
                marginHorizontal: width * (6 / 361),
              }}
            >
              Belum punya akun?
            </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  fontSize: height * (15 / 801),
                  color: '#1d4ed8',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SigninPage
