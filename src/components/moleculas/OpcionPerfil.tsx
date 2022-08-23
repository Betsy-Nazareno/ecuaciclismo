import * as React from 'react'
import tw from 'twrnc'
import { Text, Pressable, Image, ImageSourcePropType } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'

interface OpcionPerfilProps {
  icon: ImageSourcePropType
  transform?: boolean
  text: string
  handlePress: () => void
}

const OpcionPerfil = ({
  icon,
  text,
  handlePress,
  transform = false,
}: OpcionPerfilProps) => {
  return (
    <Pressable
      style={tw`my-1 py-2 flex flex-row justify-between`}
      onPress={handlePress}
    >
      <Text style={tw`${TEXT_COLORS.PRIMARY_BLUE} text-lg`}>{text}</Text>

      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          ...(transform ? { transform: [{ rotate: '270deg' }] } : {}),
          marginRight: 10,
        }}
      />
    </Pressable>
  )
}

export default OpcionPerfil
