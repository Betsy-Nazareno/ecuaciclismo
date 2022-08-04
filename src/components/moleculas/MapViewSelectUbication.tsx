import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  uri_meta_icon,
  uri_rastreo_icon,
  WIDTH_DIMENSIONS,
} from '../../utils/constants'
import MapViewDirections from 'react-native-maps-directions'
import { Ruta } from '../../models/Rutas'

interface MapViewSelectUbicationProps {
  field?: string
  value: Ruta
  select?: boolean
  height?: number
  width?: number
  setField?: (field: string, ubicacion: Ruta) => void
}

const initialRegion = {
  latitude: -2.149282084602415,
  latitudeDelta: 0.011448660773058617,
  longitude: -79.88920910283923,
  longitudeDelta: 0.008098594844341278,
}

const MapViewSelectUbication = ({
  value,
  setField,
  field,
  height = 500,
  width = WIDTH_DIMENSIONS * 0.9,
  select = false,
}: MapViewSelectUbicationProps) => {
  return (
    <View style={tw`mt-4`}>
      <MapView style={{ width, height }} initialRegion={initialRegion}>
        <MapViewDirections
          origin={value?.coordinateX}
          destination={value?.coordinateY}
          apikey="AIzaSyDMi7l9iptdGvFXZ4FgkBlmFquHvzZxpmU"
          strokeWidth={4}
          strokeColor="#0C3248"
        />
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
      </MapView>
    </View>
  )
}

export default MapViewSelectUbication
