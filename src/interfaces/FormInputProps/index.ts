import type { ReactNode } from 'react'

type autoCompleteEnum = 'email' | 'password' | 'password-new'
type keyboardTypeEnum =
  | 'number-pad'
  | 'email-address'
  | 'phone-pad'
  | 'url'
  | 'default'
  | 'visible-password'
type autoCapitilizeEnum = 'characters' | 'words' | 'sentences' | 'none'

export interface FormInputProps {
  autoComplete?: autoCompleteEnum
  autoCapitalize?: autoCapitilizeEnum
  placeholder?: string
  placeholderTextColor?: string
  value?: string
  inputType?: string
  iconLeftChildren?: ReactNode
  iconRightChildren?: ReactNode
  iconTitleRight?: string
  iconTitleRightColor?: string
  keyboardType?: keyboardTypeEnum
  backgroundColor?: string
  backgroundContainer?: string
  color?: string
  colorActive?: string
  borderColor?: string
  borderColorActive?: string
  borderRadius?: number
  borderWidth?: number
  errorMsg?: string
  height?: number
  widthContainer?: any
  widthTextInput?: any
  paddingX?: number
  paddingXContainer?: number
  paddingY?: number
  paddingYContainer?: number
  marginTop?: number
  marginBottom?: number
  fontFamily?: string
  fontSize?: number
  fontSizeTitle?: number
  showPassword?: boolean
  title?: string
  isHasTitle?: boolean
  isHasRightIconChild?: boolean
  isPhone?: boolean
  isEditable?: boolean
  isFocus?: boolean
  isRequired?: boolean
  handleRightIcon?: () => void
  onFocus?: () => void
  onChangeText?: (value: string) => void
  onBlurPressed?: (value: any) => void
  onPressDisable?: (value: any) => void
}
