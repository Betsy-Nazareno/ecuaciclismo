import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { obtenerAlertasRecibidas } from '../lib/services/alertas.services';
import { Alerta } from '../models/Alertas';

interface AlertasActivasProps {
  authToken: string;
}

const AlertasActivas = ({ authToken }: AlertasActivasProps) => {
  const [showModal, setShowModal] = useState(true);
  const [showLessInvasiveModal, setShowLessInvasiveModal] = useState(false);
  const [alertasRecibidas, setAlertasRecibidas] = React.useState<Alerta[]>([]);

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
    if(alertasRecibidas.some((alerta) => alerta.estado === 'En curso') && !showLessInvasiveModal){
        setShowModal(false);
        return true;
    }
    else if (alertasRecibidas.some((alerta) => alerta.estado === 'En curso')){
        setShowModal(true);
        return true;
    }
    else{
        return false;
    }
  };

  return (
    <>
      {/* Primer modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            {/* Icono para cerrar el modal */}
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={require('./../../assets/cancelar_icon.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            {/* Contenido del mensaje */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
              ¡Hola [Nombre y Apellido]!
            </Text>
                <Text style={{ marginVertical: 10 }}>
                  Necesitamos tu ayuda. Tenemos alertas en curso que requieren
                  tu atención en la sección de Alertas. Tu colaboración es
                  crucial para garantizar la seguridad de nuestra comunidad.
                  ¿Podrías echar un vistazo y tomar las medidas necesarias?
                </Text>
                <Text style={{ marginBottom: 20 }}>
                  Agradecemos sinceramente tu apoyo. ¡Ve a la sección de
                  Alertas ahora mismo!
                </Text>
                {/* Botón para ir a la sección de alertas */}
                <TouchableOpacity>
                  <Text style={{ color: 'orange', fontSize: 16 }}>
                    Ir a la sección de Alertas
                  </Text>
                </TouchableOpacity>
 

          </View>
        </View>
      </Modal>

      {/* Segundo modal menos invasivo */}
      {showLessInvasiveModal && (
        <Modal visible={true} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              {/* Icono para cerrar el modal */}
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={require('./../../assets/cancelar_icon.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              {/* Contenido del mensaje */}
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
                Un usuario te ha enviado una alerta.
              </Text>
              <Text style={{ marginBottom: 20 }}>
                Míralo en la sección de Alertas.
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default AlertasActivas;
