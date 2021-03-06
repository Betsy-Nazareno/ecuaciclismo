import * as React from 'react'
import { View, StyleSheet, ImageSourcePropType } from 'react-native'
import tw from 'twrnc'
import { Consejo } from '../../../models/Consejo.model'
import InformacionUsuario from '../atomos/InformacionUsuario'
import Reacciones from '../moleculas/BarraReacciones'
import Ruler from '../atomos/Ruler'
import ContenidoConsejo from '../moleculas/ContenidoConsejo'
import MenuConsejoDia from '../moleculas/MenuConsejoDia'

interface TarjetaConsejoProps {
  consejoProp: Consejo
}

const TarjetaConsejo = ({ consejoProp }: TarjetaConsejoProps) => {
  const [consejo, setConsejo] = React.useState<Consejo>()

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setConsejo(consejoProp)
    }
    return () => {
      isMounted = false
    }
  }, [consejoProp])

  return (
    <View style={styles.borderContainer}>
      <View style={tw`bg-white py-2 px-4 rounded-xl shadow-xl`}>
        <View style={tw`flex flex-row justify-between relative`}>
          <InformacionUsuario
            firstName={consejo?.first_name || ''}
            lastName={consejo?.last_name || ''}
          />
          <MenuConsejoDia consejo={consejo as Consejo} />
        </View>

        <Ruler style="w-full bg-gray-200 mb-2" />
        {consejo?.imagen ? (
          <ContenidoConsejo
            text={consejo?.informacion}
            image={{ uri: consejo?.imagen } as ImageSourcePropType}
          />
        ) : (
          <ContenidoConsejo text={consejo?.informacion} />
        )}

        <View style={tw`py-4 flex items-center`}>
          <Reacciones item={consejo as Consejo} />
        </View>
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
    marginVertical: 3,
  },
})
