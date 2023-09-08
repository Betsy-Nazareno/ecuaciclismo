import * as React from 'react'
import tw from 'twrnc'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import MapView, { Marker } from 'react-native-maps'
import {
  BACKGROUND_COLORS,
  HEIGHT_DIMENSIONS,
  uri_meta_icon,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import RutaModal from '../../organismos/RutaModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { configureBgTask } from '../../../backgroundTasks/locationTask'
import { getDatabase, ref, onValue, set, remove, get } from 'firebase/database'
import { Ruta } from '../../../models/Rutas'
import RutaFinalRastreoModal from '../../organismos/RutaFinalRastreoModal'
import {
  calcularDistancia,
  calcularKcalorias,
  calcularTiempoRecorrido,
  calcularVelocidadPromedio,
  getHorasEstimadas,
} from '../../../utils/rastreoCalculations'
import { finalizarRastreo } from '../../../lib/services/rutas.services'
import MenuAlertaRuta from '../../moleculas/MenuAlertaRuta'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Lugar } from '../../../models/Lugares'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { getLugares } from '../../../lib/services/lugares.services'
import { setLugares } from '../../../redux/lugar'
import MarcadorLugar from '../../atomos/MarcadorLugar'
import ModalInfoLugar from '../../organismos/ModalInfoLugar';
const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

interface RastreoUbicacionProps {
  ruta: Ruta
}

const RastreoUbicacion = ({ ruta }: RastreoUbicacionProps) => {
  const [location, setLocation] = React.useState<any>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [infParticipantes, setinfParticipantes] = React.useState<any>([])
  const [showModal, setShowModal] = React.useState(false)
  const [showModalAlerta, setShowModalAlerta] = React.useState(false)
  const [showFinalModal, setShowFinalModal] = React.useState(false)
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [selectedLocation, setSelectedLocation] = React.useState<{
    latitude: number | null;
    longitude: number | null;
  } | null>(null);
  const dispatch = useDispatch();
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { lugares } = useSelector((state: RootState) => state.lugar);
  const [lugarSeleccionado, setLugarSeleccionado] = React.useState<Lugar>() || undefined;
  const [modalInfoVisible, setModalInfoVisible] = React.useState(false);
  const navigation =useNavigation<NavigationProp<RootStackParamList, Screens>>()
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
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg(
          'El permiso para acceder a la ubicación en primer plano fue negado'
        )
        return errorMsg
      }
      const { status: statusBackground } =
        await Location.requestBackgroundPermissionsAsync()
      if (statusBackground !== 'granted') {
        setErrorMsg(
          'El permiso para acceder a la ubicación en segundo plano fue negado.'
        )
        return errorMsg
      }
      // await startForegroundUpdate()
      await startBackgroundLocation()
    })()
  }, [])
 useFocusEffect(
    React.useCallback(() => {
      setShowModalAlerta(false);
      return () => {
        // Código de limpieza si es necesario
      };
    }, [])
  );
  React.useEffect(() => {
    if (authToken) {
      configureBgTask({
        userToken: authToken,
        foto:
          user?.foto ||
          'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/usuarios%2Fuser.png?alt=media&token=646d4b60-b175-4ff1-85a0-25493710df24',
        setSelfLocation: (location) => setLocation(location),
      })
    }
  }, [])

  React.useEffect(() => {
    ;(async () => {
      const db = getDatabase()
      const reference = ref(db, 'users')
      onValue(reference, (snapshot) => {
        const values = snapshot.val()
        setinfParticipantes(
          Object.values(values).map((infParticipante) => infParticipante)
        )
        if (authToken) {
          const { location, retorno } = values[authToken] || {}
          setLocation({
            coords: {
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0,
            },
            retorno,
          })
        }
      })
    })()
  }, [])
  React.useEffect(() => {
    if (location && ruta.ubicacion && !location.retorno) {
      const { coordinateY } = ruta.ubicacion || {}
      const distance = calcularDistancia(location?.coords, coordinateY)
      if (distance < 2) {
        const db = getDatabase()
        const reference = ref(db, 'users/' + authToken + '/retorno')
        set(reference, true)
      }
    }
  }, [location])

  React.useEffect(() => {
    ;(async () => {
      if (location && location.retorno && ruta.ubicacion) {
        const { coordinateX } = ruta.ubicacion || {}
        const distance = calcularDistancia(location?.coords, coordinateX)
        if (distance < 2) {
          await stopTracking()
          setShowFinalModal(true)
        }
      }
    })()
  }, [location])

  const stopTracking = async () => {
    if (TaskManager.isTaskDefined(TASK_NAME)) {
      Location.stopLocationUpdatesAsync(TASK_NAME)
    }
    const hitos = await getHitosRuta()
    if (authToken && ruta.token) {
      await finalizarRastreo(hitos, authToken, ruta.token)
    }
  }

  const getHitosRuta = async () => {
    const db = getDatabase()
    const reference = ref(db, 'users/' + authToken)
    const snapshot = await get(reference)
    const values = snapshot.val()
    const kilometros = (values?.distance?.distance || 0) / 1000

    const velocidad = calcularVelocidadPromedio(
      Object.values(values?.speed || {})
    )

    const horas = calcularTiempoRecorrido(
      Object.values(values?.timestamp || {})
    )

    const kilocalorias = calcularKcalorias(horas, user?.peso || 0)
    remove(reference)
    return { kilometros, velocidad, kilocalorias, horas }
  }

  const startBackgroundLocation = async () => {
    if (TaskManager.isTaskDefined(TASK_NAME)) {
      await Location.startLocationUpdatesAsync(TASK_NAME, {
        accuracy: 1,
        timeInterval: 5,
        showsBackgroundLocationIndicator: true,
        distanceInterval: 1,
        foregroundService: {
          notificationTitle: 'Rastreando tu ubicación',
          notificationBody:
            'Estamos accediendo a tu ubicación para medir tu rendimiento en la ruta.',
          notificationColor: '#008000',
        },
      })
    }
  }

  //Útil para que el enfoque inicial del mapa sea siempre Guayaquil
  const initialRegion = {
    latitude: -2.1453021140388437,
    latitudeDelta: 0.2568955895381215,
    longitude: -79.93498552590609,
    longitudeDelta: 0.13138934969902039,
  }
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
    <View style={tw`relative`}>
      <MapView
        style={{ width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS }}
        initialRegion={initialRegion}
        onLongPress={handleMapLongPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} {...markerStyle} />}
        <Marker
          coordinate={{
            longitude: ruta?.ubicacion?.coordinateY?.longitude,
            latitude: ruta?.ubicacion?.coordinateY?.latitude,
          }}
          image={{ uri: uri_meta_icon }}
        />

        {infParticipantes.map((participante: any, index: number) => {
          const { longitude, latitude, foto } = participante.location || {}
          return (
            <Marker
              key={index}
              coordinate={{
                longitude: longitude || 0,
                latitude: latitude || 0,
              }}
            >
              <Image
                source={{ uri: foto }}
                style={{ width: 35, height: 35, borderRadius: 100 / 2 }}
              />
            </Marker>
          )
        })}
        {lugares ? (
          lugares.map((lugar: Lugar) => (
            <MarcadorLugar
              key={lugar.token}
              lugar={lugar}
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
          src={require('../../../../assets/menu_white_icon.png')}
          handleClick={() => setShowModal(true)}
        />
      </View>
      <View style={tw`absolute top-2 right-2`}>
        <RoundedButtonIcon
          src={require('../../../../assets/alert_icon.png')}
          handleClick={() => setShowModalAlerta(!showModalAlerta)}
          background = {BACKGROUND_COLORS.RED}
        />
      </View>
      {showModal && (
        <RutaModal
          visible={showModal}
          setVisible={setShowModal}
          participantes={ruta?.participantes}
          nombre={ruta?.nombre || ''}
          handleAbandonar={stopTracking}
          tokenRuta={ruta?.token}
          horasEstimadas={getHorasEstimadas(
            ruta?.fecha_inicio,
            ruta?.fecha_fin
          )}
        />
      )}
      {showModalAlerta && (
        <MenuAlertaRuta 
          visible={showModalAlerta}
          setVisible={setShowModalAlerta}
          ubicacion={{coordinateX: location?.coords,coordinateY:location?.coords}}
        />
      )


      }
      {showFinalModal && (
        <RutaFinalRastreoModal
          token={ruta?.token || ''}
          visible={showFinalModal}
          setVisible={setShowFinalModal}
        />
      )}
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

    </View>
  )
}

export default RastreoUbicacion
