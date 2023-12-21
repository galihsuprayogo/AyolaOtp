import { showMessage } from 'react-native-flash-message'
import type { MessageProps } from 'interfaces'
import { danger, success, warning } from 'utils/Colors'

export const showErrorMessage = (props: MessageProps) =>
  showMessage({
    message: props.title!,
    description: props.desc ?? undefined,
    type: 'danger',
    position: 'top',
    animated: true,
    duration: props.duration ?? 1000,
    style: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      elevation: 999,
      backgroundColor: danger[700],
    },
    titleStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontWeight: '500',
      fontSize: 15,
    },
    textStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 13,
    },
  })

export const showSuccessMessage = (props: MessageProps) =>
  showMessage({
    message: props.title!,
    description: props.desc ?? undefined,
    type: 'success',
    position: 'top',
    animated: true,
    duration: props.duration ?? 1000,
    style: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      elevation: 999,
      backgroundColor: success[700],
    },
    titleStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontWeight: '500',
      fontSize: 15,
    },
    textStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 13,
    },
  })

export const showWarningMessage = (props: MessageProps) =>
  showMessage({
    message: props.title!,
    description: props.desc ?? undefined,
    type: 'warning',
    position: 'top',
    animated: true,
    duration: props.duration ?? 1000,
    style: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      elevation: 999,
      backgroundColor: warning[500],
    },
    titleStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontWeight: '500',
      fontSize: 15,
    },
    textStyle: {
      color: '#FFFFFF',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 13,
    },
  })
