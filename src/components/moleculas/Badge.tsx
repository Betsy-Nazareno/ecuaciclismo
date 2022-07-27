import * as React from 'react'
import { Image, ImageSourcePropType, Pressable } from 'react-native'
import tw from 'twrnc'
import { CustomText } from '../atomos/CustomText'
import Gap from '../atomos/Gap'

interface BadgeProps {
  label: string
  name: string
  backgroundColor: string
  icon?: ImageSourcePropType
  handleClick?: (name: string) => void
}

const Badge = ({
  label,
  name,
  icon,
  backgroundColor,
  handleClick,
}: BadgeProps) => {
  return (
    <Pressable
      onPress={() => handleClick?.(name)}
      key={name}
      style={tw`${backgroundColor} rounded-3xl py-1 pl-2 pr-3 flex flex-row items-center h-7`}
    >
      {icon && (
        <Gap px="2">
          <Image source={icon} style={{ width: 16, height: 16 }} />
        </Gap>
      )}
      <CustomText style="text-white text-xs">{label}</CustomText>
    </Pressable>
  )
}

export default Badge
