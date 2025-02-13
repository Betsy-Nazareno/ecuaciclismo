import React from 'react';
import Badge from './Badge';
import {
    BACKGROUND_COLORS,
    ESTADOS_SOLICITUD,
  } from '../../utils/constants';
import Gap from '../atomos/Gap';


interface InfoEstadoSolicitudProps {
    estadoSolicitud: string | '';
}

const InfoEstadoSolicitud = ({estadoSolicitud}:InfoEstadoSolicitudProps) => {
    const getColorBadge = (estadoSolicitud) => {
        switch (estadoSolicitud) {
          case ESTADOS_SOLICITUD.APROBADA:
            return BACKGROUND_COLORS.GREEN_PRIMARY;
          case ESTADOS_SOLICITUD.PENDIENTE:
            return BACKGROUND_COLORS.YELLOW;
          case ESTADOS_SOLICITUD.RECHAZADA:
            return BACKGROUND_COLORS.RED;
          default:
            return BACKGROUND_COLORS.RED;
        }
      }
    return (
    <Gap px="2" py="2">
      <Badge
        name={'estado'}
        label={estadoSolicitud}
        backgroundColor={getColorBadge(estadoSolicitud)}
        styleText='text-white font-semibold'
      />
    </Gap>
  );
};

export default InfoEstadoSolicitud;