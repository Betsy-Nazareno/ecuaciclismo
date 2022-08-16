import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
} from '../../../utils/constants'

const CiclistaSafe = () => {
  return (
    <View
      style={tw`py-2 px-2 flex flex-row ${BACKGROUND_COLORS.ORANGE} bg-white border-t-2 border-solid ${BORDER_COLORS.ORANGE}`}
    >
      <View style={tw`w-9/12`}>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
          ¿Haz llegado a casa?
        </Text>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-normal pt-1`}>
          Los miembros de la comunidad están esperando tu confirmación
        </Text>
      </View>
      <View style={tw`w-3/12 flex flex-row items-center`}>
        <Image
          source={require('../../../../assets/like_reaccion_icon.png')}
          style={{ width: 20, height: 20, marginRight: 20 }}
        />
        <Image
          source={require('../../../../assets/like_reaccion_icon.png')}
          style={{
            width: 20,
            height: 20,
            transform: [{ rotateY: '190deg' }, { scaleY: -1 }],
          }}
        />
      </View>
    </View>
  )
}

export default CiclistaSafe
