import * as React from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
  Image,
} from 'react-native'
import tw from 'twrnc'
import { Consejo } from '../../../models/Consejo.model'
import InformacionUsuario from '../atomos/InformacionUsuario'
import Ruler from '../atomos/Ruler'
import ContenidoConsejo from '../moleculas/ContenidoConsejo'
import Menu from '../moleculas/Menu'

interface TarjetaConsejoProps {
  consejo: Consejo
  description: string
}

const TarjetaConsejo = ({ consejo, description }: TarjetaConsejoProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [consejoo, setConsejoo] = React.useState<Consejo>()
  React.useEffect(() => {
    setConsejoo(consejo)
  }, [consejo])

  return (
    <View style={styles.borderContainer}>
      <View style={tw`bg-white py-2 px-4 rounded-xl shadow-xl`}>
        <View style={tw`flex flex-row justify-between relative`}>
          <InformacionUsuario
            firstName={consejoo?.first_name || ''}
            lastName={consejoo?.last_name || ''}
            description={description}
          />
          <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
            <View style={tw`w-6 -mr-2`}>
              <Image
                source={require('../../../assets/menu_icon.png')}
                style={{ height: 25, width: 12 }}
              />
            </View>
          </Pressable>
          {displayMenu && (
            <Menu setDisplay={setDisplayMenu} consejo={consejoo as Consejo} />
          )}
        </View>

        <Ruler style="w-full bg-gray-200 mb-2" />
        {consejo.imagen ? (
          <ContenidoConsejo
            text={consejoo?.informacion}
            image={{ uri: consejoo?.imagen } as ImageSourcePropType}
          />
        ) : (
          <ContenidoConsejo text={consejoo?.informacion} />
        )}
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
