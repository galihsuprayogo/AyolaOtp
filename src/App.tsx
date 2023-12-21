import { Loading } from 'components'
import React from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Router from 'router'
import { type LoadingStateProps, persistor, selectLoadingState, store } from 'states'

function MainApp(): React.JSX.Element {
  const isLoading: LoadingStateProps = useSelector(selectLoadingState)
  return (
    <React.Fragment>
      <Loading isVisible={isLoading.visible} />
      <Router />
      <FlashMessage position='top' />
    </React.Fragment>
  )
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  )
}
export default App
