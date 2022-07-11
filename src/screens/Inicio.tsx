import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import Consejos from '../components/templates/Consejos'
import BannerPublicidad from '../components/organismos/BannerPublicidad'
import SectionTitle from '../components/atomos/SectionTitle'
import AdminValidator from '../components/templates/AdminValidator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { usePermissionsNotifications } from '../../hooks/usePermissionsNotifications'
import { Button } from 'react-native'

const Inicio = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { sendPushNotification, expoPushToken } = usePermissionsNotifications()
  return (
    <BasePaginas stickyIndexes={[1]}>
      <Button
        title="Notificame"
        onPress={() => {
          sendPushNotification([expoPushToken])
        }}
      >
        {' '}
      </Button>
      <AdminValidator stylesProp="py-4 px-2">
        <SectionTitle
          text="Novedades"
          hasButton
          buttonIcon={require('../../assets/edit_white_icon.png')}
          handleClickButton={() => navigation.navigate('AgregarPublicidad')}
        />
      </AdminValidator>
      <BannerPublicidad />
      <Consejos />
    </BasePaginas>
  )
}

export default Inicio
