import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc';
import { TEXT_COLORS, uri_perfil_icon } from '../../utils/constants';
import { Alerta } from '../../models/Alertas';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertaHasModified } from '../../redux/alerta';
import { confirmarAsistencia } from '../../lib/services/alertas.services';
import { not } from 'react-native-reanimated';

interface ModalProps {
    showHelpModal: boolean;
    hideHelpModalHandler: () => void;
    alerta: Alerta; // Asegúrate de definir el tipo correcto para la prop 'alerta'
    setAlerta:(nuevaAlerta: Alerta | undefined) => void;
}

const ModalConfirmarAyuda = ({ showHelpModal, hideHelpModalHandler,alerta,setAlerta }: ModalProps) => {
    const { authToken, user } = useSelector((state: RootState) => state.user);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationAttended, setConfirmationAttended] = useState(false);    
    const dispatch = useDispatch()
    const toggleConfirmationModal = () => {
      setShowConfirmationModal(!showConfirmationModal);
        setConfirmationAttended(true);
        if (confirmationAttended) {  
          hideHelpModalHandler();
        }
        
    };
    const { alertaHasModified } = useSelector(
        (state: RootState) => state.alerta
      )
    React.useEffect(() => {
        ;(async () => {
            const userIndex = alerta.participantes.findIndex(
                (participant) => participant.username === user?.username
              );
              console.log(userIndex);
            if (confirmationAttended && userIndex === -1) {
                dispatch(
                    setAlertaHasModified({
                      alertaHasModified: !alertaHasModified,
                    })
                  )
                  if (alerta.token && authToken) {
                    await confirmarAsistencia(authToken, alerta.token)
                    const newElement = {
                        "first_name": user?.first_name,
                        "foto": user?.foto,
                        "username": user?.username,
                        "last_name": user?.last_name,
                      };
                      let participants= alerta?.participantes;
                      participants.push(newElement);

                    setAlerta({ ...alerta, participantes: participants });
          
                  }
                }
            })()
    }, [confirmationAttended])

    return (
    <Modal visible={showHelpModal} transparent animationType="slide">
      <View style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white rounded-t-lg p-4 items-center`}>
          <TouchableOpacity style={tw`absolute top-4 right-4`} onPress={hideHelpModalHandler}>
            <Image
              source={require('../../../assets/cancel_icon.png')}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: user?.foto ? user.foto : uri_perfil_icon }}
            style={{ width: 50, height: 50, borderRadius: 100 / 2 }}
          />
          <Text style={tw`text-base font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}>
            {alerta?.first_name + ' ' + alerta?.last_name}
          </Text>
          <Text style={tw`text-base ${TEXT_COLORS.DARK_GRAY}`}>Te ha enviado una alerta en esta ubicacion</Text>
          <TouchableOpacity onPress={toggleConfirmationModal} style={tw`bg-orange-500 rounded-full px-4 py-2 mt-2`}>
            <Text style={tw`text-white text-center`}>Brindar ayuda</Text>
          </TouchableOpacity>
        </View>
      </View>
       {/* Segundo modal de confirmación */}
       <Modal visible={showConfirmationModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-t-lg p-4 items-center`}>
            <TouchableOpacity style={tw`absolute top-4 right-4`} onPress={toggleConfirmationModal}>
              <Image
                source={require('../../../assets/cancel_icon.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <Text style={tw`text-base font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}>
              {"Gracias por brindar tu ayuda"}
            </Text>
            <Image
                source={require('../../../assets/ciclista_confirmacion.png')}
                style={{ width: 100, height: 100 }}
              />
            <Text style={tw`text-base ${TEXT_COLORS.DARK_GRAY}`}>Se ha enviado tu respuesta a {alerta.first_name} {alerta.last_name}</Text>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};
export default ModalConfirmarAyuda;