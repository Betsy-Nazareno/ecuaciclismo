import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg('Error al obtener la ubicación');
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <View>
          <Text>Latitud: {location.coords.latitude}</Text>
          <Text>Longitud: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
      <Button title="Obtener ubicación" onPress={getLocationAsync} />
    </View>
  );
};

export default LocationComponent;
