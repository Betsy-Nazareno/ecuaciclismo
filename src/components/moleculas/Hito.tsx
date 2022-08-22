import * as React from 'react'
import tw from 'twrnc'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'

interface HitoProps {
  label: string
  image: ImageSourcePropType
}

const Hito = ({ label, image }: HitoProps) => {
  return (
    <View style={tw`flex flex-row items-center py-2`}>
      <Image
        source={image}
        style={{
          width: 20,
          height: 20,
          marginRight: 24,
        }}
      />
      <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base `}>{label}</Text>
    </View>
  )
}

export default Hito
