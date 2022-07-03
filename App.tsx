import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Main from './src/screens/Main'
import { usePermissionsNotifications } from './hooks/usePermissionsNotifications'
import { Button } from 'react-native'

export default function App() {
  const { sendPushNotification } = usePermissionsNotifications()

  return (
    <Provider store={store}>
      <Button title="hola" onPress={sendPushNotification}></Button>
      <Main />
    </Provider>
  )
}
