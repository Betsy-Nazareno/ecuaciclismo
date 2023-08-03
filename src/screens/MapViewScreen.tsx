// MapViewScreen.tsx
import * as React from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import {
    BACKGROUND_COLORS,
    HEIGHT_DIMENSIONS,
    uri_meta_icon,
    WIDTH_DIMENSIONS,
  } from './../utils/constants';
interface MapViewScreenProps {
  latitude: number;
  longitude: number;
  userPhoto: string;
  onClose: () => void;
  onRefresh?: () => void;
}

      
const MapViewScreen = ({ 
    latitude, 
    longitude, 
    userPhoto, 
    onClose ,
    onRefresh
}: MapViewScreenProps) => {
    console.log(latitude,longitude)
    const initialRegion = {
        latitude: -2.1453021140388437,
        latitudeDelta: 0.2568955895381215,
        longitude: -79.93498552590609,
        longitudeDelta: 0.13138934969902039,
      }
  return (
    <View style={tw`flex-1`}>
      <MapView
        style={{width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS }}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Usuario que emitió la alerta"
        >
          <Image source={{ uri: userPhoto }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        </Marker>
      </MapView>
      <Image
        source={require('../../assets/cancel_icon.png')}
        style={{ width: 25, height: 25, position: 'absolute', top: 30, right: 20 }}
        onPress={onClose}
      />
    </View>
  );
};

export default MapViewScreen;
