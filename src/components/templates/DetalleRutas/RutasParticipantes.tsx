import * as React from 'react'
import tw from 'twrnc'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../../utils/constants'
import { Pressable, Text } from 'react-native'
import ParticipantesRutaModal from '../../organismos/ParticipantesRutaModal'
import { User } from '../../../models/User'
import ParticipantesFotoMiniatura from '../../moleculas/ParticipantesFotoMiniatura'

interface RutasParticipantesProps {
  participantes: Partial<User>[]
}

const RutasParticipantes = ({ participantes }: RutasParticipantesProps) => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <RoundedWhiteBaseTemplate shadow={false}>
        <TitleWithDivider label="Participantes" />
        <Pressable style={tw`mx-4 my-2`} onPress={() => setShowModal(true)}>
          {participantes.length > 0 ? (
            <ParticipantesFotoMiniatura ciclistas={participantes} />
          ) : (
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} italic font-semibold text-base`}
            >
              No hay ciclistas registrados en esta ruta
            </Text>
          )}
        </Pressable>
      </RoundedWhiteBaseTemplate>
      {showModal && (
        <ParticipantesRutaModal
          visible={showModal}
          setVisible={setShowModal}
          participantes={participantes}
        />
      )}
    </>
  )
}

export default RutasParticipantes
