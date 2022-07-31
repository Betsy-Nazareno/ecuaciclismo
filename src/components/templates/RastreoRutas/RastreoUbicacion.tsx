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
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'

const RastreoUbicacion = () => {
  const [location, setLocation] = React.useState<LocationObject>()
  const [initialLocation, setinitialLocation] = React.useState<LocationObject>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [showModal2, setShowModal2] = React.useState(false)
  const ASPECT_RATIO = WIDTH_DIMENSIONS / HEIGHT_DIMENSIONS

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return errorMsg
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

  React.useEffect(() => {
    if (
      coordinateY.latitude === location?.coords.latitude &&
      coordinateY.longitude === location?.coords.longitude
    ) {
      // navigation.navigate('FinalRuta')
      setShowModal2(true)
    }
  }, [location])

  // let text = 'Waiting..'
  // if (errorMsg) {
  //   text = errorMsg
  // } else if (location) {
  //   text = JSON.stringify(location)
  // }

  // const coordinateY = {
  //   latitude: -2.1453200715782175,
  //   longitude: -79.89056378602983,
  // }

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
              // draggable={true}
              coordinate={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
              // onDragEnd={(prop) => console.log(prop.nativeEvent.coordinate)}
              image={require('../../../../assets/bicicleta_marker.png')}
            />
            <Marker
              // draggable={true}
              coordinate={coordinateY}
              image={require('../../../../assets/meta.png')}
              // onDragEnd={(prop) => console.log(prop.nativeEvent.coordinate)}
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
      {showModal2 && (
        <View style={tw`bg-red-200 top-0 absolute`}>
          <Text>Haz llegado!</Text>
        </View>
      )}
    </View>
  )
}

export default RastreoUbicacion
