import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import RoundedWhiteBaseTemplate from './RoundedWhiteBaseTemplate';

const EmptyTarjetaAlerta = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      {/* Primera línea */}
      <View style={tw`flex flex-row items-center`}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: 'gray',
            marginRight: 12,
          }}
        />
        <View>
          <Text style={tw`font-bold text-base`}>Nombre de Usuario</Text>
          <Text style={tw`text-sm`}>Tipo de Usuario</Text> 
        </View>
      </View>

      {/* Segunda línea */}
      <View
        style={{
          width: 80,
          height: 20,
          borderRadius: 16,
          backgroundColor: 'gray',
          marginTop: 12,
          marginLeft:60
        }}
      >
        <Text style={tw`text-sm text-white ml-7`}>Tipo</Text>
      </View>

      {/* Tercera línea */}
      <Text style={tw`text-base mt-4 ml-15`}>Descripción de la alerta</Text>

      {/* Cuarta línea */}
      <View style={tw`flex flex-row justify-end mt-2`}>
        <Text style={tw`text-sm text-gray-500`}>Fecha de la alerta</Text>
      </View>
    </RoundedWhiteBaseTemplate>
  );
};

export default EmptyTarjetaAlerta;
