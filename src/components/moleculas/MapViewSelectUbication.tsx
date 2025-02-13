import * as React from 'react';
import tw from 'twrnc';
import { View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
  uri_meta_icon,
  uri_rastreo_icon,
  WIDTH_DIMENSIONS,
} from '../../utils/constants';
import { RutaCoordinadas } from '../../models/Rutas';
import { MaterialIcons } from '@expo/vector-icons';

interface MapViewSelectUbicationProps {
  field?: string;
  value: RutaCoordinadas;
  select?: boolean;
  height?: number;
  width?: number;
  isUnique?: boolean;
  setField?: (field: string, ubicacion: RutaCoordinadas) => void;
  negocios?: any[];
}

const initialRegion = {
  latitude: -2.1453021140388437,
  latitudeDelta: 0.2568955895381215,
  longitude: -79.93498552590609,
  longitudeDelta: 0.13138934969902039,
};

const MapViewSelectUbication = ({
  value,
  setField,
  field,
  height = 500,
  width = WIDTH_DIMENSIONS * 0.9,
  select = false,
  isUnique = false,
  negocios = [],
}: MapViewSelectUbicationProps) => {
  const [selectedNegocio, setSelectedNegocio] = React.useState<any | null>(null);

  const closeModal = () => setSelectedNegocio(null);

  return (
    <View style={tw`mt-4`}>
      <MapView style={{ width, height }} initialRegion={initialRegion}>
        <Marker
          draggable={select}
          coordinate={value?.coordinateX}
          onDragEnd={(e) =>
            setField?.(field || '', {
              ...value,
              coordinateX: e.nativeEvent.coordinate,
            })
          }
          image={{ uri: uri_rastreo_icon }}
        />
        {!isUnique ? (
          <Marker
            draggable={select}
            coordinate={value?.coordinateY}
            onDragEnd={(e) =>
              setField?.(field || '', {
                ...value,
                coordinateY: e.nativeEvent.coordinate,
              })
            }
            image={{ uri: uri_meta_icon }}
          />
        ) : null}

        {negocios.map((negocio) => {
          const latitude =
            (parseFloat(negocio.ubicacion.coordenada_x.latitud) +
              parseFloat(negocio.ubicacion.coordenada_y.latitud)) /
            2;
          const longitude =
            (parseFloat(negocio.ubicacion.coordenada_x.longitud) +
              parseFloat(negocio.ubicacion.coordenada_y.longitud)) /
            2;

          const coordinate = { latitude, longitude };

          return (
            <Marker
              key={negocio.id}
              coordinate={coordinate}
              onPress={() => setSelectedNegocio(negocio)} 
            >
              <MaterialIcons name="store" size={30} color="blue" />
            </Marker>
          );
        })}
      </MapView>

      {selectedNegocio && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={!!selectedNegocio}
          onRequestClose={closeModal}
        >
          <View
            style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}
          >
            <View
              style={tw`bg-white rounded-lg p-5 w-80 items-center shadow-lg`}
            >
              {selectedNegocio.imagen ? (
                <Image
                  source={{ uri: selectedNegocio.imagen }}
                  style={tw`w-40 h-40 rounded-lg mb-4`}
                />
              ) : (
                <Text style={tw`text-gray-500 mb-4`}>Sin imagen</Text>
              )}
              <Text style={tw`font-bold text-xl mb-2`}>
                {selectedNegocio.nombre || 'Sin nombre'}
              </Text>
              <Text style={tw`text-center mb-4`}>
                {selectedNegocio.descripcion || 'Sin descripción'}
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                style={tw`bg-blue-500 px-4 py-2 rounded-full`}
              >
                <Text style={tw`text-white`}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MapViewSelectUbication;
