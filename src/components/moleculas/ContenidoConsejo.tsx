import * as React from 'react'
import { View, ImageSourcePropType, Image } from 'react-native'
import tw from 'twrnc'
import { CONSEJO_MAX_LENGTH, WIDTH_DIMENSIONS } from '../../utils/constants'
import TextoExpandible from '../atomos/TextoExpandible'

interface ContenidoConsejoProps {
  image?: ImageSourcePropType
  text?: string
}

const ContenidoConsejo = ({ image, text }: ContenidoConsejoProps) => {
  return (
    <View>
      <View style={tw`mx-auto`}>
        {image && (
          <Image
            source={image}
            style={{ width: WIDTH_DIMENSIONS * 0.9, height: 200 }}
          />
        )}
      </View>
      {text && (
        <View style={tw`px-[3%] py-2`}>
          <TextoExpandible text={text} maxLength={CONSEJO_MAX_LENGTH} />
        </View>
      )}
    </View>
  )
}

export default ContenidoConsejo
