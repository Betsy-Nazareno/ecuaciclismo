import * as React from 'react'
import { ImageSourcePropType, Text, View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import AdminValidator from '../templates/AdminValidator'
import RoundedButtonIcon from './RoundedButtonIcon'

interface SectionTitleProps {
  text: string
  hasUpdates?: boolean
  hasButton?: boolean
  buttonIcon?: ImageSourcePropType
  handleClickButton?: () => void
}

const SectionTitle = ({
  text,
  hasUpdates,
  hasButton,
  buttonIcon,
  handleClickButton,
}: SectionTitleProps) => {
  return (
    <View style={tw`relative`}>
      <View
        style={tw`flex flex-row relative ${BACKGROUND_COLORS.BLUE_LIGHTER}`}
      >
        <View style={tw`h-full w-[2px] bg-blue-500`} />
        <Text style={tw`ml-2 text-2xl font-bold ${TEXT_COLORS.DARK_BLUE}`}>
          {text}
        </Text>
        {hasUpdates && (
          <View
            style={tw` ml-2 mt-[2%] rounded-full h-2 w-2 ${BACKGROUND_COLORS.ORANGE}`}
          />
        )}
      </View>
      {hasButton && buttonIcon && handleClickButton && (
        <AdminValidator stylesProp="absolute -top-4 right-4">
          <RoundedButtonIcon handleClick={handleClickButton} src={buttonIcon} />
        </AdminValidator>
      )}
    </View>
  )
}

export default SectionTitle
