import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable, Image } from 'react-native'
import { catalogs } from '../../models/Rutas'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface TextCheckProps {
  option: catalogs
  handleClick: (token: string) => void
  style: string
}

const TextCheck = ({ option, style, handleClick }: TextCheckProps) => {
  const [isSelected, setIsSelected] = React.useState(false)
  return (
    <Pressable
      style={tw`${style} flex flex-row items-center`}
      onPress={() => {
        handleClick(option.token || '')
        setIsSelected(!isSelected)
      }}
    >
      <View
        style={tw`w-4 h-4 ${
          isSelected ? BACKGROUND_COLORS.PRIMARY_BLUE : 'bg-transparent'
        } border-2 border-solid border-gray-200 rounded-md mr-2 flex items-center justify-center`}
      >
        <Image
          source={require('../../../assets/check_white_icon.png')}
          style={{ width: 8, height: 8 }}
        />
      </View>
      <Text>{option.nombre}</Text>
    </Pressable>
  )
}

export default TextCheck
