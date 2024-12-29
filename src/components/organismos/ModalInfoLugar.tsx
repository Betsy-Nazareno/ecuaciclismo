import React, { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants';
import TransparentBadge from '../moleculas/TransparentBadge';
import PuntuacionSection from '../moleculas/PuntuacionSection';
import SectionReseña from './SectionReseña';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getImagePlaceByUri } from '../../utils/images';

interface ModalInfoLugarProps {
    lugar: any;
    onClose: () => void;
    isModalInfoVisible: boolean;
    setShouldRefresh: (shouldRefresh: boolean) => void;
}

const ModalInfoLugar = ({ lugar, onClose, isModalInfoVisible,setShouldRefresh }: ModalInfoLugarProps) => {   
    const [isModalReseñaVisible, setIsModalReseñaVisible] = useState(false);
    const {authToken } = useSelector((state: RootState) => state.user);

    const handleVerReseñas = () => {
        setIsModalReseñaVisible(true);
        
    };
    

    const getTipo=()=>{
      if (lugar.local_seguro !== undefined && lugar.local_seguro === 1) {
          return 'local seguro';
        }
        return lugar.tipo;
        
  }
    return(
        <>
        <Modal
            isVisible={isModalInfoVisible}
            animationOut="slideOutDown"
            animationIn="slideInUp"
            transparent={true}
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            style={tw`mx-0 mt-20 mb-0 justify-end `}
 
        >
          {
            isModalReseñaVisible===false 
            ? 
            (
              <View style={tw`w-full ${BACKGROUND_COLORS.WHITE2} opacity-95 rounded-t-3xl px-2 py-4 justify-center items-center`}>
                <ScrollView
                  style={tw`w-full`}
                >
                  <Text style={tw`text-2xl font-bold text-center mb-3 ${TEXT_COLORS.PRIMARY_BLUE}`}>{lugar.nombre}</Text>
                  <View style={[tw`w-full relative bg-white mb-2`, styles.borderContainer]}>
                    <Image source={getImagePlaceByUri(lugar.imagen)} style={[tw`w-full h-70`, styles.borderContainer]} />
                  
                    <View style={tw`absolute bottom-6 left-3`}>
                      {lugar.servicio?.length > 0 && (
                        <TransparentBadge label={lugar.servicio} />
                      )}
                      

                    </View>
                  </View>
                  
                  <View
                  style={[tw`bg-white py-1 px-4 mt-1 mx-0 w-full`, styles.borderContainer]}
                  >

                    <Text style={tw` text-xl mb-1`}>
                      {lugar.descripcion}
                    </Text>
                    <View style={tw` flex flex-row`}>
                      <Text style={tw`text-xl font-bold mb-1 ${TEXT_COLORS.SKY_BLUE}`}>Direccion: </Text>
                      <Text style={tw`text-base mt-1`}>{lugar.direccion}</Text>
                    </View>
                    {
                      getTipo() === 'local seguro' 
                      && 
                      ( 
                        <>
                          <View style={tw`mb-1 flex flex-row`}>
                            <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE}`}>Propietario: </Text>
                            <Text style={tw`text-base mt-1`}>{lugar.nombre_propietario +' ' + lugar.apellido_propietario}</Text>
                          </View>
                          <View style={tw`mb-1 flex flex-row`}>
                            <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE}`}>Horario de atencion: </Text>
                            <Text style={tw`text-base mt-1`}>
                              {`${lugar.hora_inicio.split(':')[0]}:${lugar.hora_inicio.split(':')[1]}`} - 
                              {`${lugar.hora_fin.split(':')[0]}:${lugar.hora_fin.split(':')[1]}`}
                            </Text>
                          </View>
                          <View style={tw`mb-1`}>
                            <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE} mb-1`}>Tipos de productos que ofrece: </Text>
                            <View style={tw`flex flex-row flex-wrap`}>
                              {
                                lugar.tipos_productos.map((item: string, i: number) => {
                                  return (
                                    <TransparentBadge label={item}  key={`productos-${i}`}/>
                                  );
                                })
                              }
                            </View>
                          </View>
                          <View style={tw`mb-1`}>
                            <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE} mb-1`}>Servicios que ofrece: </Text>
                            <View style={tw`flex flex-row flex-wrap`}>
                              {
                                lugar.servicios_adicionales.map((item: string, i: number) => {
                                  return (
                                    <TransparentBadge label={item}  key={`productos-${i}`}/>
                                  );
                                })
                              }
                            </View>
                          </View>
                        </>
                      )
                    }
                    {
                      getTipo() === 'ciclovia' 
                      && 
                      ( 
                        <View style={tw`mb-1 flex flex-row`}>
                          <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE}`}>Longitud: </Text>
                          <Text style={tw`text-base mt-1`}>{lugar.longitud}</Text>
                        </View>
                      )
                    }
                    {
                      getTipo() === 'parqueadero' 
                      && 
                      (
                        <>
                        <View style={tw`mb-1 flex flex-row`}>
                          <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE}`}>Capacidad: </Text>
                          <Text style={tw`text-base mt-1`}>{lugar.capacidad}</Text>
                        </View>
                        <View style={tw`mb-1 flex flex-row`}>
                          <Text style={tw`text-xl font-bold ${TEXT_COLORS.SKY_BLUE}`}>Tarifa: </Text>
                          <Text style={tw`text-base mt-1`}>{lugar.tarifa}</Text>
                        </View>
                        </>
                      )
                    }

                  </View>

                  { lugar.promedio_seguridad ? ( 
                    <PuntuacionSection 
                      puntuacionSeguridad={lugar.promedio_seguridad}
                      puntuacionAtencion={lugar.promedio_atencion}
                      puntuacionLimpieza={lugar.promedio_limpieza}
                      tipo={lugar.tipo}
                    />
                  ) : null}

                  <Pressable style={[tw`bg-white py-2 px-4 rounded-md mt-2`,styles.borderContainer]} onPress={handleVerReseñas}>
                    <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base text-center`}>Ver Reseñas</Text>
                  </Pressable>  
                </ScrollView>    
              </View>
            )
            :
            (
              <View style={tw`w-full ${BACKGROUND_COLORS.WHITE2} opacity-95 rounded-t-3xl px-2 py-4 justify-center items-center`}>
                <SectionReseña token_lugar={lugar.token} authToken={authToken} tipo={lugar.tipo} setShouldRefresh={setShouldRefresh} />
              </View>
            )
        }
      </Modal>

        </>
    );
};

export default ModalInfoLugar;

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20
  },
})