import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import { HEIGHT_DIMENSIONS, WIDTH_DIMENSIONS, uri_perfil_icon } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import tw from 'twrnc';
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon';
import ListaLugaresModal from '../../organismos/ListaLugaresModal';
import { getLugares } from '../../../lib/services/lugares.services';
import { Lugar } from '../../../models/Lugares';
import { setLugares } from '../../../redux/lugar';
import MarcadorLugar from '../../atomos/MarcadorLugar';
import ModalInfoLugar from '../../organismos/ModalInfoLugar';
import { RootStackParamList, Screens } from '../../../models/Screens.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const MapaLugares = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);
  const { user, authToken } = useSelector((state: RootState) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { lugares } = useSelector((state: RootState) => state.lugar);
  const [lugarSeleccionado, setLugarSeleccionado] = React.useState<Lugar>() || undefined;
  const dispatch = useDispatch();
  const [isModalVisibleList, setIsModalVisibleList] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const navigation =useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [initialRegion, setInitialRegion] = useState({
    latitude: -2.1453021140388437,
    latitudeDelta: 0.2568955895381215,
    longitude: -79.93498552590609,
    longitudeDelta: 0.13138934969902039,
  });

  const lugarS = lugares[0];
  React.useEffect(() => {
    ;(async function () {
      if (authToken) {
        const response = await getLugares(authToken);
        dispatch(setLugares({ lugares: response }));
        setLugarSeleccionado(lugarS);
        setShouldRefresh(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          if (location) {
            const { latitude, longitude } = location.coords;
            setInitialRegion((prevState) => ({
              ...prevState,
              latitude,
              longitude,
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const handleMapLongPress = (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleGoToLocation = () => {
    if (selectedLocation) {
      navigation.navigate('LugarFormulario', { longitud: selectedLocation.longitude, latitud: selectedLocation.latitude })

      
    }
    setIsModalVisible(false);
  };

  const markerStyle = { pinColor: 'orange' };

  return ( 
    <View>
      <MapView
        style={{width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS}}
        initialRegion={initialRegion}
        onLongPress={handleMapLongPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} {...markerStyle} />}
        <Marker
          coordinate={initialRegion}
        >
          <Image
            source={{ uri: user?.foto ? user.foto : uri_perfil_icon }}
            style={tw`w-10 h-10 rounded-full`}
          />
        </Marker>
        {lugares ? (
          lugares.map((lugar: Lugar) => (
            <MarcadorLugar
              key={lugar.token}
              lugar={lugar}
              localSafepoint={lugar.local_safepoint}
              setLugarSeleccionado={setLugarSeleccionado}
              setModalInfoVisible={setModalInfoVisible}
              setShouldRefresh={setShouldRefresh}
              shouldRefresh={shouldRefresh}
            />
          ))
        ) : (
          null
        )}
      </MapView>
      <View style={tw`absolute top-2 left-2`}>
        <RoundedButtonIcon
          src={require('../../../../assets/menuLugares.png')}
          handleClick={() => setIsModalVisibleList(true)}
        />
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose}>
        <View style={tw`bg-white p-5 rounded-lg`}>
          {selectedLocation ? (
            <>
              <Text style={tw`text-xl font-bold mb-2 text-center`}>Tu opinion importa</Text>
              <Text style={tw`text-lg text-center`}>¿Recomendar lugar en esta ubicación?</Text>
              <TouchableOpacity onPress={handleGoToLocation} style={tw`bg-blue-500 py-2 px-4 rounded-md mt-4 mx-auto`}>
                <Text style={tw`text-white text-lg text-center`}>Recomendar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={tw`text-xl font-bold text-center`}>Selecciona una ubicación</Text>
          )}
        </View>
      </Modal>
      {modalInfoVisible ? (
        <ModalInfoLugar
          isModalInfoVisible={modalInfoVisible}
          lugar={lugarSeleccionado}
          setShouldRefresh={setShouldRefresh}
          onClose={() => setModalInfoVisible(false)}
        />
      ) : (
        null
      )}
      <ListaLugaresModal isVisible={isModalVisibleList} lugares={lugares} onClose={() => setIsModalVisibleList(false)} />
    </View>
  );
};

export default MapaLugares;
