import {
  type BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {
  type CompositeNavigationProp,
  NavigationContainer,
  type NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { RootBottomTabProps, RootStackProps } from 'interfaces'
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { HomePage, LogPage, NearMePage, RegisterPage, SigninPage, VerifyPage } from 'screens'
import { gray, primary } from 'utils'
import { IconHome, IconLogout, IconNearMe } from 'assets'
import { useKeyboard } from '@react-native-community/hooks'
import { useDispatch } from 'react-redux'
import { destroyAuth } from 'states'
import _ from 'lodash'

const Stack = createNativeStackNavigator<RootStackProps>()
const Tab = createBottomTabNavigator<RootBottomTabProps>()

const Tabs = () => {
  const { height } = useWindowDimensions()
  const keyboard = useKeyboard()
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabProps, 'Home'>,
        NavigationProp<RootStackProps>
      >
    >()

  const styles = (height?: number, focused?: boolean) =>
    StyleSheet.create({
      fontBottom: {
        textAlign: 'center',
        color: focused! ? primary[500] : gray[500],
        fontSize: height! * (13 / 801),
        fontWeight: '500',
      },
      iconColor: {
        color: focused ? primary[500] : gray[500],
      },
    })

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#FFFFFF',
          height: height * 0.091,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        },
      }}
    >
      <Tab.Screen
        navigationKey='Home'
        name='Home'
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <IconHome height={21} width={21} fill={styles(height, focused).iconColor.color} />
              <Text style={styles(height, focused).fontBottom}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        navigationKey='Near'
        name='Near'
        component={NearMePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            !keyboard.keyboardShown ? (
              <Pressable
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3000,
                  top: height * (-25 / 801),
                }}
                onPress={() => console.log('near me')}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: pressed ? 60 : 62,
                      width: pressed ? 60 : 62,
                      borderRadius: pressed ? 60 / 2 : 62 / 2,
                      backgroundColor: primary[200],
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: pressed ? 46 : 48,
                        width: pressed ? 46 : 48,
                        borderRadius: pressed ? 46 / 2 : 48 / 2,
                        backgroundColor: primary[500],
                      }}
                    >
                      <IconNearMe
                        height={pressed ? 22 : 24}
                        width={pressed ? 22 : 24}
                        fill='#FFFFFF'
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            ) : null,
        }}
      />
      <Tab.Screen
        navigationKey='Log'
        name='Log'
        component={LogPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Pressable
              style={{
                alignItems: 'center',
              }}
              onPress={() => {
                _.throttle(() => {
                  dispatch(destroyAuth())
                  navigation.dispatch(StackActions.replace('Signin'))
                })()
              }}
            >
              <IconLogout height={21} width={21} fill={styles(height, focused).iconColor.color} />
              <Text style={styles(height, focused).fontBottom}>Logout</Text>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signin'>
        <Stack.Screen
          name='Register'
          component={RegisterPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Signin'
          component={SigninPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Verify'
          component={VerifyPage}
          options={{
            headerShown: false,
          }}
          initialParams={{
            email: undefined,
            username: undefined,
            password: undefined,
          }}
        />
        <Stack.Screen
          name='Main'
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
