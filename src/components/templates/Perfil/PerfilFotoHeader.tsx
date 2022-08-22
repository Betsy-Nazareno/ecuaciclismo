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

interface PerfilFotoHeaderProps {
  isAdmin: boolean
  email?: string
  nombre?: string
  apellido?: string
  foto?: string
  onUpdate: (user: Partial<User>) => void
}

const PerfilFotoHeader = ({
  isAdmin,
  email,
  nombre,
  apellido,
  foto,
  onUpdate,
}: PerfilFotoHeaderProps) => {
  const [admin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    setAdmin(isAdmin)
  }, [isAdmin])

  const changePhoto = async (file: DocumentPicker.DocumentResult) => {
    if (file.type === 'cancel') {
      return
    }
    const path = await guardarArchivo(
      FOLDERS_STORAGE.USUARIOS,
      file.name,
      file.uri
    )
    onUpdate({ foto: path })
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
            height: HEIGHT_DIMENSIONS * 0.7,
            backgroundColor: 'white',
          }}
          resizeMode="cover"
        />

        <View style={tw`absolute -bottom-6 right-2 `}>
          <RoundedGalleryButton handleImage={changePhoto} />
        </View>
      </View>

      <CustomText
        containerProps={{ textAlign: 'center' }}
        style={`text-3xl ${TEXT_COLORS.DARK_BLUE}`}
      >
        {capitalize(nombre || '')} {capitalize(apellido || '')}
      </CustomText>

      <Text style={tw`text-center text-black opacity-40`}>{email || ''}</Text>

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
