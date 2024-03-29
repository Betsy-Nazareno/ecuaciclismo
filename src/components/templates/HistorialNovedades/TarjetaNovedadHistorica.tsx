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
import { NovedadInterface } from '../../../models/Novedad.model'
import {
  RootDrawerParamList,
  ScreensDrawer,
} from '../../../models/Screens.types'
import { TEXT_COLORS } from '../../../utils/constants'
import ContenedorPaginasDetalle from '../ContenedorPaginasDetalle'

interface TarjetaNovedadHistoricaProps {
  novedad: NovedadInterface
}

const TarjetaNovedadHistorica = ({ novedad }: TarjetaNovedadHistoricaProps) => {
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  return (
    <Pressable
      onPress={() => navigation.navigate('DetalleNovedad', { data: novedad })}
    >
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#F16F31"
        borderWidth={8}
        styleProps="mt-1"
      >
        <View style={[tw`flex flex-row items-center py-2`, styles.container]}>
          {novedad.imagen ? (
            <Image
              source={{ uri: novedad.imagen } as ImageSourcePropType}
              style={{ width: 50, height: 50, borderRadius: 20 / 2 }}
            />
          ) : null}
          <View style={tw`pl-3 pr-12`}>
            <Text
              style={tw`font-bold ${TEXT_COLORS.DARK_BLUE}`}
              numberOfLines={1}
            >
              {novedad.titulo}
            </Text>
            <View style={tw`pt-1`}>
              <Text numberOfLines={3}>{novedad.descripcion_corta} </Text>
            </View>
          </View>
        </View>
      </ContenedorPaginasDetalle>
    </Pressable>
  )
}

export default TarjetaNovedadHistorica
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
