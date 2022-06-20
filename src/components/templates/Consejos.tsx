import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TarjetaConsejo from '../organismos/TarjetaConsejo'
import { JEST_TEXT } from '../../../utils/constants'
import TitleWithIcon from '../moleculas/TitleWithIcon'
import ConsejoDiaModal from '../organismos/ConsejoDiaModal'

const Consejos = () => {
  const [modalVisible, setModalVisible] = React.useState(false)

  const handleClick = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={tw`mt-2`}>
      <ConsejoDiaModal visible={modalVisible} setVisible={setModalVisible} />
      <TitleWithIcon text="Consejos del día" handleClick={handleClick} />
      <View style={tw`mt-[4%]`}>
        <TarjetaConsejo
          consejo={{
            text: JEST_TEXT,
            image: require('../../../assets/consejo.png'),
            user: {
              first_name: 'Ecuador',
              email: 'bg',
              last_name: 'Sanchez',
              username: 'hola',
            },
          }}
          description="Administrador"
        />
        <TarjetaConsejo
          consejo={{
            text: JEST_TEXT,
            image: require('../../../assets/consejo2.png'),
            user: {
              first_name: 'Ecuador',
              email: 'bg',
              last_name: 'Sanchez',
              username: 'hola',
            },
          }}
          description="Administrador"
        />
      </View>
      <TarjetaConsejo
        consejo={{
          text: JEST_TEXT,
          image: require('../../../assets/consejo.png'),
          user: {
            first_name: 'Ecuador',
            email: 'bg',
            last_name: 'Sanchez',
            username: 'hola',
          },
        }}
        description="Administrador"
      />
    </View>
  )
}

export default Consejos
