import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import Ruler from '../atomos/Ruler'

const EmptyTarjetaConsejo = () => {
  return (
    <View style={styles.borderContainer}>
      <View style={tw`bg-white py-2 px-4 rounded-xl shadow-xl`}>
        <View style={tw`flex flex-row relative`}>
          <View style={tw`pr-8 pb-4`}>
            <Image
              source={require('../../../assets/user.png')}
              style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
            />
          </View>
          <View>
            <View
              style={tw`pl-12 w-64 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
            <View
              style={tw`my-4 pl-12 w-24 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
          </View>
        </View>

        <Ruler style="w-full bg-gray-200 mb-2" />
        <View style={tw`mx-auto`}>
          <View
            style={[
              tw` rounded-lg ${BACKGROUND_COLORS.GRAY} mb-4`,
              { width: WIDTH_DIMENSIONS * 0.9, height: 200 },
            ]}
          />
        </View>
        <View
          style={[
            tw`w-36 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`,
            { width: WIDTH_DIMENSIONS * 0.9, height: 14 },
          ]}
        />
      </View>
    </View>
  )
}

export default EmptyTarjetaConsejo

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 15,
    marginVertical: 3,
  },
})
