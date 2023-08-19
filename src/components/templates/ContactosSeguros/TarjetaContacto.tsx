import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, View, Text } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, imagesRoutes } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import { DatosContactoSeguro } from './SecureContacts'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import { deleteContactoSeguro } from '../../../lib/services/user.services'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setSecureContactsHasModified } from '../../../redux/SecureContacts'

interface TarjetaComunityContactProps {
  usuario: DatosContactoSeguro
}

const TarjetaContacto = ( {usuario} : TarjetaComunityContactProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [message, setMessage] = React.useState<string>('')
  const { secureContactsHasModified } = useSelector((state: RootState) => state.contactosSeguros)
  const dispatch = useDispatch()

  const handlePress = () => {
    setShowModal(true)
  }

  const handleDelete = async () => {
    setShowModal(false)
    setMessage(await deleteContactoSeguro(usuario.token))
    setDisplayMenu(true)
  }

  let labels: string[]= Object.keys(imagesRoutes)
  let indx: number=0
  let label: string = usuario.tipo ?? ''
  while(indx<labels.length && label!= labels[indx]){
    indx++
  }
  let val
  (indx>=labels.length)?
    (val=require("../../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])
  
  if(usuario.isUser === 0){
    label='not_user'
    val=require("../../../../assets/cellphone.png")
  }

  return (
    <>
    <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName='bin_icon'
        body={message}
        setConfirmation={()=>dispatch(setSecureContactsHasModified({ secureContactsHasModified: !secureContactsHasModified }))}
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
          <View style={tw`flex flex-row items-center`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
              {capitalize(usuario.nombre)}
            </CustomText>
            <View style={{ paddingLeft: 9 }}>
              {usuario.admin ? (
                <Image
                  source={require('../../../../assets/admin.png')}
                  style={{ width: 20, height: 20 }}
                />
              ) : (label!=='') ? (
                <Image
                  source={val}
                  style={{ width: 20, height: 20 }}
                />
              ) : null}
            </View>
          </View>
          {usuario.admin ?
            (<Text style={tw`text-xs text-black text-opacity-40`}>Administrador</Text>)
            : (usuario.isUser === 1) ? 
                (<Text style={tw`text-xs text-black text-opacity-40`}>{label}</Text>)
                : (<Text style={tw`text-xs text-black text-opacity-40`}>{usuario.celular}</Text>)
          }
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
