import React from 'react';
import Badge from './Badge';
import {
    BACKGROUND_COLORS,
    TIPOS_LUGARES,
    tiposDeLugares,
  } from '../../utils/constants';
import { View } from 'react-native';


interface TipoLugarProps {
    tipoLugar: string | '';

}

const LabelTipoLugar = ({tipoLugar}:TipoLugarProps) => {
    const getColorBadge = (tipoLugar) => {
        switch (tipoLugar) {
          case TIPOS_LUGARES.CICLOVIA:
            return BACKGROUND_COLORS.ORANGE ;
          case TIPOS_LUGARES.PARQUEADERO:
            return BACKGROUND_COLORS.DARK_GRAY;
          case TIPOS_LUGARES.LOCAL_SEGURO:
            return BACKGROUND_COLORS.GREEN_SECONDARY;
          default:
            return BACKGROUND_COLORS.SKY_BLUE;
        }
      }
    return (
    <View style={{width:130}}>
      <Badge
        icon={
            tiposDeLugares.find((lugar) => lugar.nombre === tipoLugar)?.icon
        }
        name={'Tipo de lugar'}
        label={tipoLugar}
        backgroundColor={getColorBadge(tipoLugar)}
        styleText='text-white font-semibold'

      />
    </View>
  );
};

export default LabelTipoLugar;