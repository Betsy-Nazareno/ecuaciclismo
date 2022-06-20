import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'
import { Consejo } from '../../../models/Consejo.model'
import { JEST_TEXT } from '../../../utils/constants'
import InformacionUsuario from '../atomos/InformacionUsuario'
import ContenidoConsejo from '../moleculas/ContenidoConsejo'

interface TarjetaConsejoProps {
  consejo: Consejo
  description: string
}

const TarjetaConsejo = ({ consejo, description }: TarjetaConsejoProps) => {
  return (
    <View style={styles.borderContainer}>
      <View style={tw`bg-white py-2 px-4 rounded-xl shadow-xl`}>
        <InformacionUsuario user={consejo.user} description={description} />
        <ContenidoConsejo text={JEST_TEXT} image={consejo.image as any} />
      </View>
    </View>
  )
}

export default TarjetaConsejo

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 15,
    marginVertical: 6,
  },
})
