import * as React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ImageSourcePropType,
  Image,
} from 'react-native'
import tw from 'twrnc'

interface ButtonPrimaryProps {
  label: string
  handleClick?: () => void
  style: string
  icon?: ImageSourcePropType
  iconDimension?: number
}

const ButtonPrimary = ({
  label,
  style,
  handleClick,
  icon,
  iconDimension = 25,
}: ButtonPrimaryProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View
        style={tw`py-3 px-6 rounded-md ${style} flex flex-row justify-center`}
      >
        <Text style={tw`text-center font-bold text-white text-base`}>
          {label}
        </Text>
        {icon && (
          <Image
            source={icon}
            style={{
              width: iconDimension,
              height: iconDimension,
              marginLeft: 12,
            }}
          />
        )}
      </View>
    </TouchableHighlight>
  )
}

export default ButtonPrimary
