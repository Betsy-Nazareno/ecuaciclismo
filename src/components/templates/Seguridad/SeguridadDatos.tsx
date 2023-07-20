import * as React from 'react';
import tw from 'twrnc';
import { Text, Image, View } from 'react-native';
import SectionTitle from '../../moleculas/SectionTitle';
import { ButtonTab } from '../../atomos/ButtonTab';
import { TEXT_COLORS } from '../../../utils/constants';

const SeguridadDatos = () => {
  const [text, setText] = React.useState('');
  return (
    <View>
      <>
        <SectionTitle text="Alertas" />
        <View style={tw`bg-white px-2 pt-8`}>
          <ButtonTab screen="Inicio">
            <Image
              source={require('../../../../assets/consejo_icon.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
              Ir a Alertas
            </Text>
          </ButtonTab>
        </View>
      </>
      <>
        <SectionTitle text="Contactos Seguros" />
        <View style={tw`bg-white px-2 pt-8`}>
          <ButtonTab screen="Inicio">
            <Image
              source={require('../../../../assets/consejo_icon.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
              Ir a contactos seguros
            </Text>
          </ButtonTab>
        </View>
      </>
    </View>
  );
};

export default SeguridadDatos;


