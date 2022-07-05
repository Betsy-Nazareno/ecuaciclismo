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
import ContenedorPaginasDetalle from '../templates/ContenedorPaginasDetalle'

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
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#6a7bd2"
        borderWidth={8}
        styleProps="mt-1"
      >
        <View style={[tw`flex flex-row items-center py-2`, styles.container]}>
          {consejo.imagen ? (
            <Image
              source={{ uri: consejo.imagen } as ImageSourcePropType}
              style={{ width: 50, height: 50, borderRadius: 20 / 2 }}
            />
          ) : null}
          <View style={tw`pl-3 pr-12`}>
            <Text style={styles.text}>{consejo.informacion} </Text>
          </View>
        </View>
      </ContenedorPaginasDetalle>
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
})
