import * as React from 'react'
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import ContenedorPaginasDetalle from '../ContenedorPaginasDetalle'
import { RootDrawerParamList, ScreensDrawer } from '../../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'




const TarjetaBicicleta = () => {
    const navigation =
        useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

    return (
        <Pressable onPress={() => navigation.navigate('DetalleBicicleta', { token: '' })} >

            <ContenedorPaginasDetalle borderRight colorBorder="#F16F31" borderWidth={8} styleProps="mt-1">
                <View style={[tw`flex flex-row items-center py-2`, styles.container]}>
                    <View style={tw`flex-row flex-1`}>
                        <Image source={{ uri: '' } as ImageSourcePropType} style={{ width: 50, height: 50, borderRadius: 20 / 2 }} />
                        <View style={tw`pl-3 pr-12 flex-1`}>
                            <Text style={tw`font-bold ${TEXT_COLORS.DARK_BLUE}`} numberOfLines={1}>
                                Modelo 1
                            </Text>
                            <View style={tw`pt-1`}>
                                <Text numberOfLines={3}> Marca 1 </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#F16F31"
                        style={{ borderRadius: 100 / 2 }}
                    >
                        <Image source={require('../../../../assets/trash.jpg')} style={{ width: 20, height: 20 }} />
                    </TouchableHighlight>

                </View>
            </ContenedorPaginasDetalle>
        </Pressable>
    )
}

export default TarjetaBicicleta
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
