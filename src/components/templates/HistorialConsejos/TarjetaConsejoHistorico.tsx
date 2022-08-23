import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import tw from 'twrnc'
import { Consejo } from '../../../models/Consejo.model'
import {
  RootDrawerParamList,
  ScreensDrawer,
} from '../../../models/Screens.types'

interface TarjetaConsejoHistoricoProps {
  consejo: Consejo
}

const TarjetaConsejoHistorico = ({ consejo }: TarjetaConsejoHistoricoProps) => {
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  return (
    <Pressable
      onPress={() => navigation.navigate('ConsejoDetalle', { consejo })}
    >
      <View
        style={[
          tw`bg-white mt-2 h-24 flex flex-row items-center overflow-hidden rounded-xl`,
          styles.borderSide,
        ]}
      >
        {consejo.imagen ? (
          <Image
            source={{ uri: consejo.imagen } as ImageSourcePropType}
            style={{ width: 90, height: 95 }}
          />
        ) : null}

        <View style={tw`pl-3 pr-12 w-10/12`}>
          <Text style={styles.text}>{consejo.informacion} </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default TarjetaConsejoHistorico
const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    marginTop: 2,
    borderColor: '#DFDFDF',
  },
  text: {
    overflow: 'hidden',
    height: 40,
    lineHeight: 20,
    color: '#0C3248',
  },
  borderSide: {
    borderBottomColor: '#DFDFF0',
    borderBottomWidth: 1,
    borderLeftColor: '#DFDFF0',
    borderLeftWidth: 1,
    borderTopColor: '#DFDFF0',
    borderTopWidth: 1,
    borderRadius: 14,
    borderRightColor: '#6a7bd2',
    borderRightWidth: 6,
  },
})
