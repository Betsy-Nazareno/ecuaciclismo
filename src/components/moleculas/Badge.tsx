import * as React from 'react'
import { Image, ImageSourcePropType, Pressable } from 'react-native'
import tw from 'twrnc'
import { CustomText } from '../atomos/CustomText'
import Gap from '../atomos/Gap'

interface BadgeProps {
  label: string
  name: string
  backgroundColor: string
  stylesProp?: string
  styleText?: string
  icon?: ImageSourcePropType | undefined
  handleClick?: (name: string) => void
}

const Badge = ({
  label,
  name,
  icon,
  stylesProp,
  backgroundColor,
  styleText="text-white text-xs",
  handleClick,
}: BadgeProps) => {
  return (
    <Pressable
      onPress={() => handleClick?.(name)}
      key={name}
      style={tw`${backgroundColor} rounded-3xl py-1 pl-2 pr-3 flex flex-row items-center h-7 ${
        stylesProp || ''
      }`}
    >
      {icon && (
        <Gap px="2">
          <Image source={icon} style={{ width: 16, height: 16 }} />
        </Gap>
      )}
      <CustomText style={styleText}>{label}</CustomText>
    </Pressable>
  )
}

export default Badge
