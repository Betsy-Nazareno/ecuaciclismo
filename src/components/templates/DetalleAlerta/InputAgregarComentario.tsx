import * as React from 'react'
import { View } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import VerticalDivider from '../../atomos/VerticalDivider'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Input from '../../moleculas/Input'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import tw from 'twrnc'
import FieldFormulario from '../../moleculas/FieldFormulario'
import { agregarComentarioAlerta} from '../../../lib/services/alertas.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { capitalize } from '../../../utils/capitalizeText'

interface InputAgregarComentarioProps {
  nombreUsuario: string
  tokenUsuario: string
  tokenAlerta: string
  fotoUsuario?: string
  tokenNotificacion?: string
  onSend: () => void
}

const InputAgregarComentario = ({
  nombreUsuario,
  tokenUsuario,
  tokenAlerta,
  fotoUsuario,
  tokenNotificacion,
  onSend,
}: InputAgregarComentarioProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const [comentario, setComentario] = React.useState('')
  const { sendPushNotification } = usePermissionsNotifications()

  const sendNotificacionComentario = async () => {
    if (!tokenUsuario || !tokenNotificacion) return
    await sendPushNotification({
      tokens: [tokenNotificacion],
      title: 'Nuevos comentarios',
      body: `${capitalize(user?.first_name)} ${capitalize(
        user?.last_name
      )} ha comentado tu alerta: ${nombreUsuario}`,
    })
  }

  const sendComentario = async () => {
    if (tokenUsuario && tokenAlerta && comentario) {
      await agregarComentarioAlerta(
        tokenUsuario,
        tokenAlerta,
        comentario
      )
      await sendNotificacionComentario()
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
              <View style={tw`w-[88%]`}>
                <Input
                  type="none"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={comentario}
                  setValue={(value) => setComentario(value)}
                  stylesInput="border-0"
                  placeholder="Recuerda seguir las normas de la comunidad..."
                />
              </View>
              <View style={tw`w-[5%]`}>
                <RoundedButtonIcon
                  style="h-8 w-8"
                  src={require('../../../../assets/enviar_icon.png')}
                  handleClick={sendComentario}
                />
              </View>
            </View>
          </FieldFormulario>
        </View>
        <VerticalDivider />
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default InputAgregarComentario