import * as React from 'react'
import { View, ImageSourcePropType, Image } from 'react-native'
import tw from 'twrnc'
import { CONSEJO_MAX_LENGTH } from '../../../utils/constants'
import TextoExpandible from '../atomos/TextoExpandible'

interface ContenidoConsejoProps {
  image?: ImageSourcePropType
  text?: string
}

const ContenidoConsejo = ({ image, text }: ContenidoConsejoProps) => {
  return (
    <View style={tw``}>
      <View style={tw`mx-auto`}>
        {image && <Image source={image} style={{ width: 200, height: 200 }} />}
      </View>
      {text && (
        <View style={tw`px-[3%]`}>
          <TextoExpandible text={text} maxLength={CONSEJO_MAX_LENGTH} />
        </View>
      )}
    </View>
  )
}

export default ContenidoConsejo
