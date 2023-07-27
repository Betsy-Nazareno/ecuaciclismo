import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import { DatosContactoSeguro } from './SecureContacts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import { deleteContactoSeguro } from '../../../lib/services/user.services'

interface TarjetaContactoProps {
  usuario: DatosContactoSeguro
  setAction: (value: boolean) => void
}

const TarjetaContacto = ({ usuario, setAction }: TarjetaContactoProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [message, setMessage] = React.useState<string>('')
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const handlePress = () => {
    setShowModal(true)
  }

  const handleDelete = async () => {
    setShowModal(false)
    setMessage(await deleteContactoSeguro(usuario.token))
    if (message=='') {setMessage('Hubo un error, intentalo de nuevo más tarde.')}
    setDisplayMenu(true)
  }

  return (
    <>
    <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName='bin_icon'
        body={message}
        setConfirmation={setAction}
    />

    <ConfirmationPopUp
        setVisible={setShowModal}
        visible={showModal}
        imageName='bin_icon'
        body={`¿Desea eliminar a ${usuario.nombre} de su lista de contactos seguros?`}
        setConfirmation={handleDelete}
    />

    <View
      style={tw`bg-white rounded-xl w-full my-1 py-2 flex flex-row justify-between`}
    >
      <View style={tw`flex flex-row items-center`}>
        <Image
          source={
            usuario.foto
              ? { uri: usuario.foto }
              : require('../../../../assets/user.png')
          }
          style={{
            width: 60,
            height: 60,
            borderRadius: 400 / 2,
          }}
          resizeMode="contain"
        />
        <Gap px="4">
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
            {capitalize(usuario.nombre)}
          </CustomText>
        </Gap>
      </View>

      <View style={tw`flex flex-row right-0 items-center justify-between`}>
        <Pressable onPress={handlePress}>
            <Image
              source={require('../../../../assets/bin_icon.png')}
              style={{ width: 30, height: 30 }}
            />
        </Pressable>
      </View>

    </View>
    </>
  )
}

export default TarjetaContacto
