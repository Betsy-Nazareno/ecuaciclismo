import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Subscription } from 'expo-modules-core'

export interface PushNotificationProps {
  tokens: string[]
  title: string
  body: string
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export const usePermissionsNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  // useEffect(() => {
  //   // registerForPushNotificationsAsync().then((token) => {
  //   //   setExpoPushToken(token || '')
  //   //   console.info(token)
  //   // })

  //   // // This listener is fired whenever a notification is received while the app is foregrounded
  //   // notificationListener.current =
  //   //   Notifications.addNotificationReceivedListener((notification) => {
  //   //     setNotification(notification)
  //   //   })

  //   // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   // responseListener.current =
  //   //   Notifications.addNotificationResponseReceivedListener((response) =>
  //   //     console.log(response)
  //   //   )

  //   // return () => {
  //   //   Notifications.removeNotificationSubscription(
  //   //     notificationListener.current as Subscription
  //   //   )
  //   //   Notifications.removeNotificationSubscription(
  //   //     responseListener.current as Subscription
  //   //   )
  //   // }
  // }, [])

  async function sendPushNotification({
    tokens,
    title,
    body,
  }: PushNotificationProps) {
    const message = {
      to: tokens,
      sound: 'default',
      title,
      body,
      data: { someData: 'goes here' },
    }
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  }

  async function registerForPushNotificationsAsync() {
    try {
      let token
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
      } else {
        alert('Must use physical device for Push Notifications')
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: '../assets/sounds/bell-notification.wav',
          lightColor: '#FF231F7C',
        })
      }

      return token
    } catch (e) {
      return ''
    }
  }

  return {
    sendPushNotification,
    registerForPushNotificationsAsync,
    expoPushToken,
  }
}
