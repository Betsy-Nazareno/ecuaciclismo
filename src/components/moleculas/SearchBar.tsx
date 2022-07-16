import * as React from 'react'
import { View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import Input from '../atomos/Input'
interface SearchBarProps {
  text: string
  setText: (text: string) => void
}

const SearchBar = ({ text, setText }: SearchBarProps) => {
  return (
    <View style={tw`pt-2`}>
      <View style={tw`relative`}>
        <Input
          type="none"
          placeholder="Buscar..."
          stylesInput="bg-white"
          value={text}
          setValue={setText}
        />
        <Pressable style={tw`absolute top-5 right-4`}>
          <View>
            <Image
              source={require('../../../assets/search_icon.png')}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default SearchBar
