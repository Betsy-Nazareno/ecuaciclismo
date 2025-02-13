import * as React from 'react'
import tw from 'twrnc'
import { View, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setAlertaHasModified } from '../../redux/alerta'
import ConfirmationModal from '../organismos/ConfirmationModal'
import { Alerta } from '../../models/Alertas'
import OpcionesMenuAlertas from '../atomos/OpcionesMenuAlertas'
import { actualizarAlerta, registrarLogAlerta } from '../../lib/services/alertas.services'

interface MenuAlertasProps {
  alerta: Alerta
  uuid: string
  setAlerta: (nuevaAlerta: Alerta | undefined) => void;
}
const MenuAlertas = ({ alerta,uuid ,setAlerta }: MenuAlertasProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [showmodalCancelled, setShowModalCancelled] = React.useState(false)
  const [confirmationCancelled, setConfirmationCancelled] = React.useState(false)
  const [confirmationAttended, setConfirmationAttended] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const [motivo, setMotivo] = React.useState('')
  const { alertaHasModified } = useSelector(
    (state: RootState) => state.alerta
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    ; (async () => {
      if (confirmationAttended) {
        dispatch(
          setAlertaHasModified({
            alertaHasModified: !alertaHasModified,
          })
        )
        if (alerta.token && authToken) {
          const data = await actualizarAlerta(authToken, alerta.token, 'Atendida', '')
          const status = data?.status;
          const message = data?.message;
          setAlerta({ ...alerta, estado: 'Atendida' });
          setShowModal(false)
          if(status==='success'){
            await registrarLogAlerta(authToken!, "Alerta Atendida", "El usuario ha finaliza la alerta como atendida", uuid);
          }else{
            await registrarLogAlerta(authToken!, "Alerta No Atendida", message, uuid);
          }
        }

      }
    })()
  }, [confirmationAttended])
  React.useEffect(() => {
    ; (async () => {
      if (confirmationCancelled) {
        dispatch(
          setAlertaHasModified({
            alertaHasModified: !alertaHasModified,
          })
        )
        if (alerta.token && authToken) {
          const response = await actualizarAlerta(authToken, alerta.token, 'Cancelada', motivo)
          const status = response.status;
          const message = response.message;
          setAlerta({ ...alerta, estado: 'Cancelada' });
          setShowModalCancelled(false)
          if(status==='success'){
            await registrarLogAlerta(authToken!, "Alerta Cancelada", "El usuario ha finaliza la alerta como cancelada", uuid);
          }else{
            await registrarLogAlerta(authToken!, "Alerta No Cancelada", message, uuid);
          }
        }

      }
    })()
  }, [confirmationCancelled])

  const handleAttended = async () => {
    await registrarLogAlerta(authToken!, "Opción - Atendida", "El usuario ha seleccionado que va a marcar como atendida la alerta", uuid);
    setShowModal(true)
  }

  const handleCancelled = async () => {
    await registrarLogAlerta(authToken!, "Opción - Cancelada", "El usuario ha seleccionado que va a marcar como cancelada la alerta", uuid);
    setShowModalCancelled(true)
  }

  return (
    <>
      <ConfirmationModal
        setVisible={setShowModal}
        visible={showModal}
        labelId='buttonconfirmationAtendAlert'
        title={'Marcar como atendida'}
        body="¿Estás seguro que desear marcar como atendida tu alerta?"

        setConfirmation={setConfirmationAttended}
      />
      <ConfirmationModal
        setVisible={setShowModalCancelled}
        visible={showmodalCancelled}
        title={'Cancelar Alerta'}
        labelId='buttoncancelAprobeAlert'
        body="¿Estás seguro que deseas cancelar tu alerta?"
        motivo={motivo}
        setMotivo={setMotivo}
        setConfirmation={setConfirmationCancelled}
      />
      <View style={tw`z-40`}>
        <Pressable onPress={async () => { setDisplayMenu(!displayMenu); await registrarLogAlerta(authToken!, "Opciones de Alerta", "El usuario ha seleccione las opciones del menú de alertas", uuid); }}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ width: 20, height: 20 }}
          />
        </Pressable>
        {displayMenu && (
          <OpcionesMenuAlertas
            handleCancelled={handleCancelled}
            handleAttended={handleAttended}
          />
        )}
      </View>
    </>
  )
}

export default MenuAlertas