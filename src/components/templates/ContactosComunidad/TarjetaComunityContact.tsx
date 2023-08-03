import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, imagesRoutes } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import { DatosBasicosUser } from '../Comunidad/ComunidadAndRoles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import { addContactoSeguro } from '../../../lib/services/user.services'
import { setSecureContactsHasModified } from '../../../redux/SecureContacts'

interface TarjetaComunityContactProps {
  usuario: DatosBasicosUser
  isUser: number
}

const TarjetaComunityContact = ({ usuario, isUser }: TarjetaComunityContactProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [message, setMessage] = React.useState<string>('')
  const { secureContactsHasModified } = useSelector((state: RootState) => state.contactosSeguros)
  const dispatch = useDispatch()

  const handlePress = () => {
    setShowModal(true)
  }

  const addSecureContact = async() => {
    setShowModal(false)
    let token: string=authToken??''
    setMessage(await addContactoSeguro(token, isUser, usuario.usuario_id, '', ''))
    setDisplayMenu(true)
  }

  let labels: string[]= Object.keys(imagesRoutes)
  let indx: number=0
  let label: string = usuario.tipo ?? ''
  while(indx<labels.length && label!= labels[indx]){indx++}
  let val
  (indx>=labels.length)?
    (val=require("../../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])

  return (
    <>
    <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName='green_check'
        body={message}
        setConfirmation={()=>dispatch(setSecureContactsHasModified({ secureContactsHasModified: !secureContactsHasModified }))}
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
          <View style={tw`flex flex-row items-center`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
              {capitalize(usuario.first_name)} {capitalize(usuario.last_name)}
            </CustomText>
            <View style={{ paddingLeft: 9 }}>
              {usuario.admin ? (
                <Image
                  source={require('../../../../assets/admin.png')}
                  style={{ width: 20, height: 20 }}
                />
              ) : (label!=='No verificado' && label!=='') ? (
                <Image
                  source={val}
                  style={{ width: 20, height: 20 }}
                />
              ) : null}
            </View>
          </View>
          {usuario.admin ? 
            (<Text style={tw`text-xs text-black text-opacity-40`}>Administrador</Text>) 
            : (<Text style={tw`text-xs text-black text-opacity-40`}>{label}</Text>)
          }
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
