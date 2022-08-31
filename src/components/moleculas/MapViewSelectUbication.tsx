import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import {
  uri_meta_icon,
  uri_rastreo_icon,
  WIDTH_DIMENSIONS,
} from '../../utils/constants'
import { RutaCoordinadas } from '../../models/Rutas'
import SearchLocation from './SearchLocation'

interface MapViewSelectUbicationProps {
  field?: string
  value: RutaCoordinadas
  select?: boolean
  height?: number
  width?: number
  setField?: (field: string, ubicacion: RutaCoordinadas) => void
}

const initialRegion = {
  latitude: -2.1453021140388437,
  latitudeDelta: 0.2568955895381215,
  longitude: -79.93498552590609,
  longitudeDelta: 0.13138934969902039,
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
      {select ? (
        <>
          <SearchLocation
            setCoordinates={(coordinates) =>
              setField?.(field || '', {
                ...value,
                coordinateX: coordinates,
              })
            }
            placeholder="Origen"
            iconSrc={require('../../../assets/origen_icon.png')}
            dimensionIcon={20}
          />
          <SearchLocation
            setCoordinates={(coordinates) =>
              setField?.(field || '', {
                ...value,
                coordinateY: coordinates,
              })
            }
            placeholder="Destino"
            iconSrc={require('../../../assets/destino_icon.png')}
            dimensionIcon={20}
          />
        </>
      ) : null}
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
