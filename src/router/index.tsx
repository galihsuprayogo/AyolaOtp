import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { RootStackProps } from 'interfaces'
import { SigninPage } from 'screens'

const Stack = createNativeStackNavigator<RootStackProps>()

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signin'>
        <Stack.Screen
          name='Signin'
          component={SigninPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
