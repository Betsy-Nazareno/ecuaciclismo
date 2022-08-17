import * as React from 'react'
import tw from 'twrnc'
import { Image, View } from 'react-native'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import MapView, { Marker } from 'react-native-maps'
import {
  HEIGHT_DIMENSIONS,
  uri_meta_icon,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import RutaModal from '../../organismos/RutaModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { configureBgTask } from '../../../backgroundTasks/locationTask'
import { getDatabase, ref, onValue, set, remove } from 'firebase/database'
import { Ruta } from '../../../models/Rutas'
import { getDistance } from 'geolib'
import RutaFinalRastreoModal from '../../organismos/RutaFinalRastreoModal'

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

interface RastreoUbicacionProps {
  ruta: Ruta
}

const RastreoUbicacion = ({ ruta }: RastreoUbicacionProps) => {
  const [location, setLocation] = React.useState<any>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [infParticipantes, setinfParticipantes] = React.useState<any>([])
  const [showModal, setShowModal] = React.useState(false)
  const [showFinalModal, setShowFinalModal] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)

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

  React.useEffect(() => {
    if (authToken) {
      configureBgTask({
        userToken: authToken,
        foto: 'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/users%2Florena.jpg?alt=media&token=3c535d29-7063-463c-899f-4d4a3c2eb5f8',
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
      const distance = getDistance(
        {
          latitude: location?.coords?.latitude,
          lng: location?.coords?.longitude,
        },
        { latitude: coordinateY.latitude, longitude: coordinateY.longitude }
      )
      // console.log(distance)
      if (distance < 20) {
        // console.log('ey, llegaste')
        //Finalizar ruta
        const db = getDatabase()
        const reference = ref(db, 'users/' + authToken + '/retorno')
        set(reference, true)
      }
      // console.log(distance)
    }
  }, [location])

  React.useEffect(() => {
    if (location && location.retorno && ruta.ubicacion) {
      const { coordinateX } = ruta.ubicacion || {}
      const distance = getDistance(
        {
          latitude: location?.coords?.latitude,
          lng: location?.coords?.longitude,
        },
        { latitude: coordinateX?.latitude, longitude: coordinateX?.longitude }
      )

      if (distance < 300) {
        if (TaskManager.isTaskDefined(TASK_NAME)) {
          Location.stopLocationUpdatesAsync(TASK_NAME)
        }
        setShowFinalModal(true)
        //calcular velocidad, km y kcalorias y enviar a la db
      }
    }
  }, [location])

  const deleteUserFromRTDB = async () => {
    const db = getDatabase()
    const reference = ref(db, 'users/' + authToken)
    remove(reference)
  }

  // console.log(getFinalSpeed())
  // const startForegroundUpdate = async () => {
  //   const location = await Location.getCurrentPositionAsync({})
  //   setinitialLocation(location)

  //   await Location.watchPositionAsync(
  //     { accuracy: 5, distanceInterval: 1 },
  //     (location) => {
  //       setLocation(location)
  //     }
  //   )
  // }

  //Cuando el usuario finalice la ruta=> eliminarlo de la rtdb, calcularle sus vainas
  const startBackgroundLocation = async () => {
    if (TaskManager.isTaskDefined(TASK_NAME)) {
      await Location.startLocationUpdatesAsync(TASK_NAME, {
        accuracy: 5,
        timeInterval: 5000,
        showsBackgroundLocationIndicator: true,
        distanceInterval: 5000,
        foregroundService: {
          notificationTitle: 'Tracking your location',
          notificationBody: "Let's rock and roll",
          notificationColor: '#008000',
        },
      })
    }
  }

  return (
    <View style={tw`relative`}>
      <MapView style={{ width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS }}>
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
      </MapView>
      <View style={tw`absolute top-2 left-2`}>
        <RoundedButtonIcon
          src={require('../../../../assets/menu_white_icon.png')}
          handleClick={() => setShowModal(true)}
        />
      </View>
      {showModal && (
        <RutaModal
          visible={showModal}
          setVisible={setShowModal}
          participantes={ruta?.participantes}
          nombre={ruta?.nombre || ''}
        />
      )}
      {showFinalModal && (
        <RutaFinalRastreoModal
          visible={showFinalModal}
          setVisible={setShowFinalModal}
          deleteUser={deleteUserFromRTDB}
        />
      )}
    </View>
  )
}

export default RastreoUbicacion
