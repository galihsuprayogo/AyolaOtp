import type { ReactNode } from 'react'

export interface ButtonGlobalProps {
  width?: any
  height?: number
  backgroundColor?: string
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  iconLeftChildren?: ReactNode
  marginTop?: number
  marginBottom?: number
  marginRight?: number
  marginLeft?: number
  title?: string
  titleColor?: string
  titleFontSize?: number
  titleFontFamily?: string
  onPress: () => void
}
