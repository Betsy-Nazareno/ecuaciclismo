import * as React from 'react'
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootState } from '../../redux/store'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'

interface OptionSideMenuProps {
  source?: ImageSourcePropType
  label: string
  name: string
  handleClick?: () => void
}

const OptionSideMenu = ({
  source,
  label,
  name,
  handleClick,
}: OptionSideMenuProps) => {
  const { activeTab } = useSelector((state: RootState) => state.drawerTabs)
  return (
    <Pressable onPress={handleClick}>
      <View style={tw`flex flex-row items-center pl-4 py-4 my-1`}>
        {activeTab === name && (
          <View
            style={tw`h-full ${BACKGROUND_COLORS.ORANGE} w-1 rounded-lg mr-2`}
          />
        )}
        {source ? (
          <View style={tw`pr-2`}>
            <Image source={source} style={{ width: 30, height: 30 }} />
          </View>
        ) : null}
        <View>
          <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE}`}>{label}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default OptionSideMenu
