import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import Consejos from '../components/templates/Consejos'
import BannerPublicidad from '../components/organismos/BannerPublicidad'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getCiclistasToken } from '../../lib/services/notifications.services'
import { Button } from 'react-native'
import { usePermissionsNotifications } from '../../hooks/usePermissionsNotifications'

const Inicio = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { sendPushNotification } = usePermissionsNotifications()

  const handle = async () => {
    const tokens = await getCiclistasToken(authToken || '')
    sendPushNotification(tokens)
  }

  return (
    <BasePaginas stickyHeader>
      <Button title="hola" onPress={handle}></Button>
      <BannerPublicidad />
      <Consejos />
    </BasePaginas>
  )
}

export default Inicio
