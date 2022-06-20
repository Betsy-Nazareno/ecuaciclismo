import React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import tw from 'twrnc'

interface Props {
  title: string
  srcImage: ImageSourcePropType
}

export const ButtonTab = ({ title, srcImage }: Props) => {
  return (
    <>
      <View style={tw`flex flex-col items-center`}>
        <Image source={srcImage} style={{ width: 25, height: 25 }} />
        <Text style={tw`pt-1`}>{title}</Text>
      </View>
      <View style={tw`mt-[2%] h-1 w-9/12 mx-auto rounded-3xl bg-gray-600`} />
    </>
  )
}
