import { NavigatorScreenParams } from '@react-navigation/native'
import { RootBottomTabProps } from 'interfaces'

export type RootStackProps = {
  Register: undefined
  Signin: undefined
  Verify: {
    email?: string
    username?: string
    password?: string
  }
  Main: NavigatorScreenParams<RootBottomTabProps>
}
