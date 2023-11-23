import * as React from 'react'
import tw from 'twrnc'
import { View, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setAlertaHasModified } from '../../redux/alerta'
import ConfirmationModal from '../organismos/ConfirmationModal'
import { Alerta } from '../../models/Alertas'
import OpcionesMenuAlertas from '../atomos/OpcionesMenuAlertas'
import { actualizarAlerta } from '../../lib/services/alertas.services'

interface MenuAlertasProps {
  alerta: Alerta
  setAlerta: (nuevaAlerta: Alerta | undefined) => void;
}
const MenuAlertas = ({ alerta, setAlerta }: MenuAlertasProps) => {
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
          await actualizarAlerta(authToken, alerta.token, 'Atendida', '')
          setAlerta({ ...alerta, estado: 'Atendida' });
          setShowModal(false)

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
          await actualizarAlerta(authToken, alerta.token, 'Cancelada', motivo)
          setAlerta({ ...alerta, estado: 'Cancelada' });
          setShowModalCancelled(false)

        }

      }
    })()
  }, [confirmationCancelled])

  const handleAttended = () => {
    setShowModal(true)
  }

  const handleCancelled = async () => {
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
        <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ width: 20, height: 20 }}
          />
        </Pressable>
        <OpcionesMenuAlertas
          handleCancelled={handleCancelled}
          handleAttended={handleAttended}
        />
      </View>
    </>
  )
}

export default MenuAlertas