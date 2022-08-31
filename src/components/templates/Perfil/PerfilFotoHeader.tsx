import * as React from 'react'
import tw from 'twrnc'
import { View, Image, Text } from 'react-native'
import {
  FOLDERS_STORAGE,
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import { CustomText } from '../../atomos/CustomText'
import { capitalize } from '../../../utils/capitalizeText'
import * as DocumentPicker from 'expo-document-picker'
import RoundedGalleryButton from '../../moleculas/RoundedGalleryButton'
import { User } from '../../../models/User'
import { guardarArchivo } from '../../../lib/googleCloudStorage'
import UserValidator from '../UserValidator'
import Spinner from '../../atomos/Spinner'

interface PerfilFotoHeaderProps {
  isAdmin: boolean
  email?: string
  nombre?: string
  apellido?: string
  foto?: string
  idUser: string
  telefono?: string
  onUpdate: (user: Partial<User>) => void
}

const PerfilFotoHeader = ({
  isAdmin,
  email,
  nombre,
  apellido,
  foto,
  idUser,
  telefono,
  onUpdate,
}: PerfilFotoHeaderProps) => {
  const [admin, setAdmin] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setAdmin(isAdmin)
  }, [isAdmin])

  const changePhoto = async (file: DocumentPicker.DocumentResult) => {
    setIsLoading(true)
    if (file.type === 'cancel') {
      return
    }
    const path = await guardarArchivo(
      FOLDERS_STORAGE.USUARIOS,
      file.name,
      file.uri
    )
    await onUpdate({ foto: path })
    setIsLoading(false)
  }

  return (
    <>
      <View style={tw`relative mb-6`}>
        <Image
          source={
            foto
              ? { uri: foto }
              : require('../../../../assets/user_placeholder.png')
          }
          style={{
            width: WIDTH_DIMENSIONS,
            height: HEIGHT_DIMENSIONS * 0.65,
            backgroundColor: 'white',
          }}
          resizeMode="cover"
        />
        {isLoading ? (
          <View
            style={tw`bg-black bg-opacity-30 absolute top-0 left-0 w-full h-full`}
          >
            <Spinner />
          </View>
        ) : null}

        <UserValidator userToken={idUser}>
          <View style={tw`absolute -bottom-6 right-2 `}>
            <RoundedGalleryButton handleImage={changePhoto} />
          </View>
        </UserValidator>
      </View>

      <CustomText
        containerProps={{ textAlign: 'center' }}
        style={`text-3xl ${TEXT_COLORS.DARK_BLUE}`}
      >
        {capitalize(nombre || '')} {capitalize(apellido || '')}
      </CustomText>

      <Text style={tw`text-center text-black opacity-40`}>
        {email || ''}
        {telefono ? (
          <Text style={tw`text-center text-black opacity-40`}>
            {' - '}
            {telefono}
          </Text>
        ) : null}
      </Text>
      <View style={tw`mt-1`}>
        <CustomText
          containerProps={{ textAlign: 'center' }}
          style={`text-xl ${TEXT_COLORS.ORANGE}`}
        >
          {admin ? 'Administrador' : 'Ciclista'}
        </CustomText>
      </View>
    </>
  )
}

export default PerfilFotoHeader
