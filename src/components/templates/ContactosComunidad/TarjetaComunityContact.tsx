import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import { DatosBasicosUser } from '../Comunidad/ComunidadAndRoles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import { addContactoSeguro } from '../../../lib/services/user.services'

interface TarjetaComunityContactProps {
  usuario: DatosBasicosUser
  isUser: number
  setAction: (value: boolean) => void
}

const TarjetaComunityContact = ({ usuario, isUser, setAction }: TarjetaComunityContactProps) => {
  const [admin, setAdmin] = React.useState(!!usuario.admin)
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [message, setMessage] = React.useState<string>('')
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const handlePress = () => {
    setShowModal(true)
  }

  const addSecureContact = async() => {
    setShowModal(false)
    let token: string=authToken??''
    setMessage(await addContactoSeguro(token, isUser, usuario.usuario_id, '', ''))
    if (message=='') {setMessage('Hubo un error, intentalo de nuevo más tarde.')}
    setDisplayMenu(true)
  }  

  return (
    <>
    <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName='green_check'
        body={message}
        setConfirmation={setAction}
    />

    <ConfirmationPopUp
        setVisible={setShowModal}
        visible={showModal}
        imageName='green_check'
        body={`¿Desea marcar a ${usuario.first_name} ${usuario.last_name} como contacto seguro?`}
        setConfirmation={addSecureContact}
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
            {capitalize(usuario.first_name)} {capitalize(usuario.last_name)}
          </CustomText>
        </Gap>
      </View>

      <View style={tw`flex flex-row right-0 items-center`}>
        <Pressable onPress={handlePress}>
            <Image
              source={require('../../../../assets/agregar-usuario.png')}
              style={{ width: 30, height: 30 }}
            />
        </Pressable>      
      </View>

    </View>
    </>
  )
}

export default TarjetaComunityContact
