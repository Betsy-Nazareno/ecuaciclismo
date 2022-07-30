import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { HEIGHT_DIMENSIONS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import MapViewDirections from 'react-native-maps-directions'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import RutaModal from '../../organismos/RutaModal'

const RastreoUbicacion = () => {
  const [location, setLocation] = React.useState<LocationObject>()
  const [initialLocation, setinitialLocation] = React.useState<LocationObject>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const ASPECT_RATIO = WIDTH_DIMENSIONS / HEIGHT_DIMENSIONS

  React.useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setinitialLocation(location)

      await Location.watchPositionAsync(
        { accuracy: 5, distanceInterval: 1 },
        (location) => {
          setLocation(location)
        }
      )
    })()
  }, [])

  // let text = 'Waiting..'
  // if (errorMsg) {
  //   text = errorMsg
  // } else if (location) {
  //   text = JSON.stringify(location)
  // }

  const coordinateY = {
    latitude: -2.1453200715782175,
    longitude: -79.89056378602983,
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
    </View>
  )
}

export default RastreoUbicacion
