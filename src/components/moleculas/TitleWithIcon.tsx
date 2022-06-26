import * as React from 'react'
import { View } from 'react-native'
import SectionTitle from '../atomos/SectionTitle'
import tw from 'twrnc'
import RoundedButtonIcon from '../atomos/RoundedButtonIcon'

interface TitleWithIconProps {
  text: string
  handleClick: () => void
}

const TitleWithIcon = ({ text, handleClick }: TitleWithIconProps) => {
  return (
    <View style={tw`relative`}>
      <SectionTitle text={text} hasUpdates />
      <View style={tw`absolute -top-[24%] right-[4%]`}>
        <RoundedButtonIcon
          handleClick={handleClick}
          src={require('../../../assets/edit.png')}
        />
      </View>
    </View>
  )
}

export default TitleWithIcon
