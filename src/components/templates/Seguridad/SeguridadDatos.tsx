import * as React from 'react';
import tw from 'twrnc';
import { Text, Image, View } from 'react-native';
import SectionTitle from '../../moleculas/SectionTitle';
import { ButtonTab } from '../../atomos/ButtonTab';
import { TEXT_COLORS, BACKGROUND_COLORS } from '../../../utils/constants';

const SeguridadDatos = () => {
  const [text, setText] = React.useState('');
  return (
    <View>
      <>
        <View style={tw`bg-white px-5 pt-15 justify-center items-center`}>
          <ButtonTab screen="Rutas" activeBackgroundColor={BACKGROUND_COLORS.WHITE}>
            <Image
              source={require('../../../../assets/alerta_fondo.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xl font-bold`}>
              Alertas
            </Text>
          </ButtonTab>
        </View>
      </>
      <>

        <View style={tw`bg-white px-2 pt-15 justify-center items-center`}>
          <ButtonTab screen="Comunidad" activeBackgroundColor={BACKGROUND_COLORS.WHITE}>
            <Image
              source={require('../../../../assets/contacto_seguro_fondo.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xl font-bold`}>
              
              Contactos seguros
            </Text>
          </ButtonTab>
        </View>
      </>
    </View>
  );
};

export default SeguridadDatos;


