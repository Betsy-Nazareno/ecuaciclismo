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
  label?: string // Prop opcional para el título de la sección
  texto?: string // Prop opcional para el texto de "No hay ciclistas registrados en esta ruta"

}

const RutasParticipantes = ({
  participantes,
  label = 'Participantes', // Valor por defecto para el título de la sección
  texto = 'No hay ciclistas registrados en esta ruta', // Valor por defecto para el texto de "No hay ciclistas registrados en esta ruta"
}: RutasParticipantesProps) => {
  const [showModal, setShowModal] = React.useState(false)
  const [listaParticipantes, setlistaParticipantes] =
    React.useState(participantes)

  React.useEffect(() => {
    setlistaParticipantes(participantes)
  }, [participantes])
  return (
    <>
      <RoundedWhiteBaseTemplate shadow={false}>
        <TitleWithDivider label={label}/>
        <Pressable style={tw`mx-4 my-2`} onPress={() => setShowModal(true)}>
          {listaParticipantes.length > 0 ? (
            <ParticipantesFotoMiniatura ciclistas={participantes} />
          ) : (
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} italic font-semibold text-base`}
            >
              {texto} 
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
