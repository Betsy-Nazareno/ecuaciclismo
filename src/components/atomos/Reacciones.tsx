import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import tw from 'twrnc'

const Reacciones = () => {
  return (
    <View>
      <View style={tw`flex flex-row`}>
        <View style={styles.borderContainer}>
          <Image
            source={require('../../../assets/bicicleta_icon.png')}
            style={{ width: 25, height: 22 }}
          />
        </View>

        <View style={styles.borderContainer}>
          <Image
            source={require('../../../assets/susto_icon.png')}
            style={{ width: 25, height: 22 }}
          />
        </View>

        <View style={styles.borderContainer}>
          <Image
            source={require('../../../assets/policia_icon.png')}
            style={{ width: 25, height: 22 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Reacciones

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 13,
    paddingHorizontal: 6,
    paddingBottom: 3,
    marginHorizontal: 8,
    display: 'flex',
    alignItems: 'center',
  },
})
