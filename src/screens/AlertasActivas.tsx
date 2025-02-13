import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { obtenerAlertasRecibidas } from '../lib/services/alertas.services';
import { Alerta } from '../models/Alertas';
import tw from 'twrnc';
import { RootStackParamList, Screens } from '../models/Screens.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLORS} from '../utils/constants';
import { ButtonTab } from '../components/atomos/ButtonTab';
interface AlertasActivasProps {
  authToken: string;
  user: any;
}

const AlertasActivas = ({ authToken}: AlertasActivasProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showLessInvasiveModal, setShowLessInvasiveModal] = useState(false);
  const [alertasRecibidas, setAlertasRecibidas] = React.useState<Alerta[]>([]);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  // Función para obtener las alertas recibidas al montar el componente
  useEffect(() => {
    const fetchAlertasRecibidas = async () => {
      try {
        const alertas = await obtenerAlertasRecibidas(authToken);
        setAlertasRecibidas(alertas);
      } catch (error) {
        console.log('Error al obtener las alertas recibidas:', error);
      }
    };
    fetchAlertasRecibidas();
  }, [authToken]);

  useEffect(() => {
    // Verificar si hay alertas en curso y mostrar los modales en consecuencia
    setShowModal(hasAlertasEnCurso());
  }, [alertasRecibidas]);


  // Función para abrir o cerrar el modal
  const toggleModal = () => {
    if (showModal) {
      setShowModal(false);
      setShowLessInvasiveModal(hasAlertasEnCurso());
    } else {
      setShowLessInvasiveModal(false);
    }
  };


  // Función para verificar si el usuario tiene alertas en curso
  const hasAlertasEnCurso = () => {
    if(alertasRecibidas?.some((alerta) => alerta.estado === 'En curso') && !showLessInvasiveModal){
        setShowModal(false);
        return true;
    }
    else if (alertasRecibidas?.some((alerta) => alerta.estado === 'En curso')){
        setShowModal(true);
        return true;
    }
    else{
        return false;
    }
  };
  const goToAlertasScreen = () => {
    navigation.navigate('Alertas'); // Cambia 'Alertas' al nombre de tu pantalla de Alertas
  };

  return (
    <>
      {/* Primer modal */}
      <Modal 
      isVisible={showModal} 
      animationIn={"slideInUp"} 
      animationOut={"slideOutDown"} 
      backdropOpacity={0.5}
      onBackdropPress={toggleModal}
      style={tw`mx-0 mt-20 mb-0 justify-end `}

      >
        <View
            style={{
                backgroundColor: 'white',
                padding: 40,
                borderRadius: 10,
                alignItems: 'center',
                height: '65%', // El modal cubrirá el 65% de la pantalla verticalmente
                width: '100%',
            }}
            >
            {/* Icono para cerrar el modal */}
            <TouchableOpacity
                onPress={toggleModal}
                style={{
                position: 'absolute',
                top: 10,
                right: 10,
                }}
            >
                <Image
                source={require('./../../assets/cancel_icon.png')}
                style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>

            {/* Contenido del mensaje */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 80, color: 'blue' }}>
            ¡Hola, soy el sistema de Alertas!
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 20, color: 'gray' }}>
            Necesitamos tu ayuda. Tenemos alertas en curso que requieren tu atención
            en la sección de Alertas. 
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, color: 'gray' }}>
            Tu colaboración es crucial para garantizar la
            seguridad de nuestra comunidad.
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, color: 'gray' }}>
            ¿Podrías echar un vistazo y tomar las medidas necesarias?
            </Text>

            {/* Botón para ir a la sección de alertas */}
            <ButtonTab screen="Alertas" activeBackgroundColor={BACKGROUND_COLORS.ORANGE}>
            <View style={{
                backgroundColor: 'orange',
                paddingHorizontal: 60,
                paddingVertical: 15,
                borderRadius: 30,
                width: 200,
                height: 50,
              }}>
                <Text style={{ color: 'white', fontSize: 16 }}>
                    Ver Alertas
                </Text>
            </View>
          </ButtonTab>
        </View>
    
        </Modal>


      {/* Segundo modal menos invasivo */}
      {showLessInvasiveModal && (
        <TouchableOpacity style={tw`bg-red-500 p-4 items-center`} onPress={goToAlertasScreen}>
          {/* Contenido del mensaje */}
          <Text style={tw`text-white text-base font-semibold `}>
            Un usuario te ha enviado una alerta.
          </Text>
          <Text style={tw`text-white text-sm mt-1`}>
            Míralo en la sección de Alertas.
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AlertasActivas;
