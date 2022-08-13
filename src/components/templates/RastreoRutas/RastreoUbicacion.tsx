import * as React from 'react'
import tw from 'twrnc'
import { Image, View } from 'react-native'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { HEIGHT_DIMENSIONS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import RutaModal from '../../organismos/RutaModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { configureBgTask } from '../../../backgroundTasks/locationTask'
import { getDatabase, ref, onValue } from 'firebase/database'

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

const RastreoUbicacion = () => {
  const [location, setLocation] = React.useState<LocationObject>()
  const [initialLocation, setinitialLocation] = React.useState<LocationObject>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [infParticipantes, setinfParticipantes] = React.useState<any>([])
  const [showModal, setShowModal] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const ASPECT_RATIO = WIDTH_DIMENSIONS / HEIGHT_DIMENSIONS
  React.useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return errorMsg
      }
      const { status: statusBackground } =
        await Location.requestBackgroundPermissionsAsync()
      if (statusBackground !== 'granted') {
        setErrorMsg('Permission to access location on background was denied')
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
      const reference2 = ref(db, 'users')
      onValue(reference2, (snapshot) => {
        const values = snapshot.val()
        setinfParticipantes(
          Object.values(values).map((infParticipante) => infParticipante)
        )
      })
    })()
  }, [])

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

  const startBackgroundLocation = async () => {
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

  const coordinateY = {
    latitude: -2.1288014497416903,
    longitude: -79.95376970618963,
  }

  const latDelta = (location?.coords.latitude || 0) - coordinateY.latitude
  const lngDelta = latDelta * ASPECT_RATIO

  return (
    <View style={tw`relative`}>
      <MapView
        style={{ width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS }}
        initialRegion={
          location
            ? {
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
              }
            : undefined
        }
      >
        {location && (
          <>
            <Marker
              coordinate={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
            >
              <Image
                source={require('../../../../assets/lorena.jpg')}
                style={{ width: 35, height: 35, borderRadius: 100 / 2 }}
              />
            </Marker>
            {infParticipantes.map((participante: any, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  longitude: participante?.longitude || 0,
                  latitude: participante?.latitude || 0,
                }}
                onDragEnd={(prop) => console.log(prop.nativeEvent.coordinate)}
              >
                <Image
                  source={{ uri: participante.foto }}
                  style={{ width: 35, height: 35, borderRadius: 100 / 2 }}
                />
              </Marker>
            ))}
          </>
        )}
      </MapView>
      <View style={tw`absolute top-2 left-2`}>
        <RoundedButtonIcon
          src={require('../../../../assets/menu_white_icon.png')}
          handleClick={() => setShowModal(true)}
        />
      </View>
      {showModal && <RutaModal visible={showModal} setVisible={setShowModal} />}
    </View>
  )
}

export default RastreoUbicacion
