import * as React from 'react'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Gap from '../../atomos/Gap'
import Ruler from '../../atomos/Ruler'
import { BACKGROUND_COLORS } from '../../../utils/constants'

const RutasParticipantes = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Participantes" />
      <Gap py="3">
        <DetalleUsuario nombre="Betsy Nazareno" hasDate={false} />
      </Gap>
      <Ruler style={`w-10/12 mx-auto ${BACKGROUND_COLORS.GRAY}`} />
      <Gap py="3">
        <DetalleUsuario nombre="Betsy Nazareno" hasDate={false} />
      </Gap>
      <Ruler style={`w-10/12 mx-auto ${BACKGROUND_COLORS.GRAY}`} />
      <Gap py="3">
        <DetalleUsuario nombre="Betsy Nazareno" hasDate={false} />
      </Gap>
      <Ruler style={`w-10/12 mx-auto ${BACKGROUND_COLORS.GRAY}`} />
      <Gap py="3">
        <DetalleUsuario nombre="Betsy Nazareno" hasDate={false} />
      </Gap>
      <Ruler style={`w-10/12 mx-auto ${BACKGROUND_COLORS.GRAY}`} />
      <Gap py="3">
        <DetalleUsuario nombre="Betsy Nazareno" hasDate={false} />
      </Gap>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutasParticipantes
