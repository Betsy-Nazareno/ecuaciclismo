import * as React from 'react'
import tw from 'twrnc'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Gap from '../../atomos/Gap'
import Ruler from '../../atomos/Ruler'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import { Image, Pressable, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import ViewMoreRounded from '../../atomos/ViewMoreRounded'
import ParticipantesRutaModal from '../../organismos/ParticipantesRutaModal'
import { User } from '../../../models/User'
import ParticipantesFotoMiniatura from '../../moleculas/ParticipantesFotoMiniatura'

const users = [
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Betsy', last_name: 'Nazareno' } as User,
  { first_name: 'Carlos', last_name: 'Matamoro' } as User,
  { first_name: 'Reymar', last_name: 'García' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
  { first_name: 'Diana', last_name: 'Zambrano' } as User,
]

const RutasParticipantes = () => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <RoundedWhiteBaseTemplate shadow={false}>
        <TitleWithDivider label="Participantes" />
        <Pressable style={tw`mx-4 my-2`} onPress={() => setShowModal(true)}>
          <ParticipantesFotoMiniatura
            images={[
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
              require('../../../../assets/lorena.jpg'),
            ]}
          />
        </Pressable>
      </RoundedWhiteBaseTemplate>
      {showModal && (
        <ParticipantesRutaModal
          visible={showModal}
          setVisible={setShowModal}
          participantes={users}
        />
      )}
    </>
  )
}

export default RutasParticipantes
