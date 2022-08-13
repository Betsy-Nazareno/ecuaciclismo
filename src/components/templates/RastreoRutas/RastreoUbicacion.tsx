import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { HEIGHT_DIMENSIONS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import MapViewDirections from 'react-native-maps-directions'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import RutaModal from '../../organismos/RutaModal'
import * as TaskManager from 'expo-task-manager'

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

const RastreoUbicacion = () => {
  const [location, setLocation] = React.useState<LocationObject>()
  const [initialLocation, setinitialLocation] = React.useState<LocationObject>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [lista, setLista] = React.useState<number[]>([])
  const [showModal, setShowModal] = React.useState(false)
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
      await startForegroundUpdate()
      await startBackgroundLocation()
    })()
  }, [])

  const startForegroundUpdate = async () => {
    const location = await Location.getCurrentPositionAsync({})
    setinitialLocation(location)

    await Location.watchPositionAsync(
      { accuracy: 5, distanceInterval: 1 },
      (location) => {
        setLocation(location)
      }
    )
  }

  const startBackgroundLocation = async () => {
    const isTaskDefined = await TaskManager.isTaskDefined(TASK_NAME)
    if (!isTaskDefined) {
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) {
      return
    }

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: 5,
      showsBackgroundLocationIndicator: true,
    })
  }

  TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
      return
    }
    if (data) {
      const { locations } = (data as any) || {}
      const [location] = locations || []

      if (location) {
        setLocation(location)
        setLista([...lista, 1])
      } else {
        setLista([...lista, 0])
      }
    }
  })

  const coordinateY = {
    latitude: -2.1288014497416903,
    longitude: -79.95376970618963,
  }

  const latDelta =
    (initialLocation?.coords.latitude || 0) - coordinateY.latitude
  const lngDelta = latDelta * ASPECT_RATIO

  return (
    <View style={tw`relative`}>
      <MapView
        style={{ width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS }}
        initialRegion={
          initialLocation
            ? {
                latitude: initialLocation?.coords.latitude,
                longitude: initialLocation?.coords.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
              }
            : undefined
        }
      >
        {location && (
          <>
            <MapViewDirections
              origin={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
              destination={coordinateY}
              apikey="AIzaSyDMi7l9iptdGvFXZ4FgkBlmFquHvzZxpmU"
              strokeWidth={4}
              strokeColor="#0C3248"
            />

            <Marker
              coordinate={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
              image={require('../../../../assets/bicicleta_marker.png')}
            />
            <Marker
              coordinate={coordinateY}
              image={require('../../../../assets/meta.png')}
            />
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
      {lista?.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  )
}

export default RastreoUbicacion
