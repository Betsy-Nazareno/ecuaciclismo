import * as React from 'react'
import { ImageSourcePropType, View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import AdminValidator from '../templates/AdminValidator'
import RoundedButtonIcon from '../atomos/RoundedButtonIcon'
import { CustomText } from '../atomos/CustomText'

interface SectionTitleProps {
  text: string
  styleText?: string
  background?: boolean
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
  styleText = '',
  background = true,
  handleClickButton,
}: SectionTitleProps) => {
  return (
    <View
      style={tw`relative pt-4 ${
        background ? BACKGROUND_COLORS.BLUE_LIGHTER : ''
      }`}
    >
      <View style={tw`flex flex-row`}>
        {background && <View style={tw`h-full w-[2px] bg-blue-500 mr-2`} />}
        <CustomText
          style={`text-2xl font-bold ${TEXT_COLORS.DARK_BLUE} ${styleText}`}
        >
          {text}
        </CustomText>
        {hasUpdates && (
          <View
            style={tw`ml-2 mt-[2%] rounded-full h-2 w-2 ${BACKGROUND_COLORS.ORANGE}`}
          />
        )}
      </View>
      {hasButton && buttonIcon && handleClickButton && (
        <AdminValidator stylesProp="absolute top-2 right-2 z-40">
          <RoundedButtonIcon handleClick={handleClickButton} src={buttonIcon} />
        </AdminValidator>
      )}
    </View>
  )
}

export default SectionTitle
