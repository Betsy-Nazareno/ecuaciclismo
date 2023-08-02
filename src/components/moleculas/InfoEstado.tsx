import React from 'react';
import Badge from './Badge';
import {
    BACKGROUND_COLORS,
    ESTADOS_ALERTA,
  } from '../../utils/constants';
import Gap from '../atomos/Gap';


interface InfoEstadoProps {
    estadoAlerta: string | '';
}

const InfoEstado = ({estadoAlerta}:InfoEstadoProps) => {
    const getColorBadge = (estadoAlerta) => {
        switch (estadoAlerta) {
          case ESTADOS_ALERTA.EN_CURSO:
            return BACKGROUND_COLORS.GREEN_PRIMARY;
          case ESTADOS_ALERTA.ATENDIDA:
            return BACKGROUND_COLORS.SKY_BLUE;
          case ESTADOS_ALERTA.CANCELADA:
            return 'bg-black bg-opacity-80';
          default:
            return BACKGROUND_COLORS.PRIMARY_BLUE;
        }
      }
    return (
    <Gap px="2" py="2">
      <Badge
        name={'estado'}
        label={estadoAlerta}
        backgroundColor={getColorBadge(estadoAlerta)}
        styleText='text-white font-semibold'
      />
    </Gap>
  );
};

export default InfoEstado;