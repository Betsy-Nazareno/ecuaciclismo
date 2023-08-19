import * as React from 'react'
import { View } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import VerticalDivider from '../../atomos/VerticalDivider'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Input from '../../moleculas/Input'
import tw from 'twrnc'
import FieldFormulario from '../../moleculas/FieldFormulario'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { capitalize } from '../../../utils/capitalizeText'
import { new_reseña, update_reseña } from '../../../lib/services/lugares.services'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import UnfocusButton from '../../atomos/UnfocusButton'


interface InputAgregarReseñaProps {
  nombreUsuario: string
  tokenUsuario: string
  tokenLugar: string
  fotoUsuario?: string
  tokenNotificacion?: string
  onSend: () => void
  isEdit?: boolean
  puntuacion_atencion?: number
  puntuacion_limpieza?: number
  puntuacion_seguridad?: number
  token_reseña?: string | ''
  contenidoExistente?: string
  setIsActualizado?: React.Dispatch<React.SetStateAction<boolean>> | true

}

const InputAgregarReseña = ({
    isEdit,
  nombreUsuario,
  tokenUsuario,
  tokenLugar,
  fotoUsuario,
  tokenNotificacion,
  onSend,
  puntuacion_atencion,
  puntuacion_limpieza,
  puntuacion_seguridad,
  token_reseña,
  contenidoExistente,
  setIsActualizado

}: InputAgregarReseñaProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const [contenido, setContenido] = React.useState(contenidoExistente || '')
  const { sendPushNotification } = usePermissionsNotifications()

  const sendNotificacionReseña = async () => {
    if (!tokenUsuario || !tokenNotificacion) return
    await sendPushNotification({
      tokens: [tokenNotificacion],
      title: 'Nuevas Reseñas',
      body: `${capitalize(user?.first_name)} ${capitalize(
        user?.last_name
      )} ha añadido una reseña: ${nombreUsuario}`,
    })
  }

  const sendReseña = async () => {
    if (tokenUsuario && tokenLugar && contenido) {
      await new_reseña(
        tokenUsuario,
        tokenLugar,
        contenido,
        puntuacion_atencion,
        puntuacion_limpieza,
        puntuacion_seguridad
      )
      await sendNotificacionReseña()
      setIsActualizado(true)
      onSend()
    }
  }
  const updateReseña = async () => {
    if (tokenUsuario && tokenLugar && contenido) {
        await update_reseña(
            tokenUsuario,
            token_reseña,
            contenido,
            puntuacion_atencion,
            puntuacion_limpieza,
            puntuacion_seguridad
          )
          setIsActualizado(true)

        onSend()
    }
}


  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`relative px-2`}>
        <View style={tw`pt-3 z-40`}>
          <DetalleUsuario
            hasDate={false}
            nombre={nombreUsuario}
            foto={fotoUsuario}
          />
        </View>
        <View style={tw`bg-white z-40 mt-4`}>
          <FieldFormulario>
            <View style={tw`flex flex-row items-center`}>
                <Input
                  type="none"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={ contenido}
                  setValue={(value) => setContenido(value)}
                  stylesInput="border-0"
                  placeholder="Recuerda seguir las normas de la comunidad..."
                />
            </View>
          </FieldFormulario>
          { isEdit===false ? (
                <View style={tw`mt-2 flex flex-row`} >
                <UnfocusButton 
                    label="Cancelar"
                    style="w-full mr-12"
                    handleClick={onSend}
                />
                <ButtonPrimary
                    label="Publicar"
                    style={`w-full ${BACKGROUND_COLORS.SKY_BLUE} rounded-lg`}
                    handleClick={sendReseña}
                />
                </View>
            ) :(
              <View style={tw`mt-2 flex flex-row`} >
                <UnfocusButton 
                    label="Cancelar"
                    style="w-full mr-12"
                    handleClick={onSend}
                />
                <ButtonPrimary
                label="Guardar"
                style={`w-full ${BACKGROUND_COLORS.SKY_BLUE} rounded-lg`}
                handleClick={updateReseña}
                />
              </View>
            )}
        </View>
        <VerticalDivider />
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default InputAgregarReseña