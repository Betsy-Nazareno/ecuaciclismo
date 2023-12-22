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
import { useSelector } from "react-redux";
import ContenedorPaginasDetalle from '../ContenedorPaginasDetalle'
import { RootDrawerParamList, ScreensDrawer } from '../../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Bicicleta } from '../../../models/Bicicletas'
import { eliminarBicicleta } from '../../../lib/services/bicicleta.services'
import { RootState } from '../../../redux/store'


interface TarjetaPublicacionesProps {
    bicicleta: Bicicleta;
    onEliminar: (id: string) => void;
}

const TarjetaBicicleta = ({ bicicleta, onEliminar  }: TarjetaPublicacionesProps) => {
    const { authToken } = useSelector((state: RootState) => state.user)

    const navigation =
        useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
    const eliminarBici = async () => {
        if (authToken) {
            const response = await eliminarBicicleta(authToken!, bicicleta.id!);
            const status: string = response?.status
            if (status === 'success') {
                onEliminar(bicicleta.id!)
            }
        }
    };
    return (
        <Pressable onPress={() => navigation.navigate('DetalleBicicleta', { token: '' })} >
            <ContenedorPaginasDetalle borderRight colorBorder="#F16F31" borderWidth={8} styleProps="mt-1">
                <View style={[tw`flex flex-row items-center py-2`, styles.container]}>
                    <View style={tw`flex-row flex-1`}>
                        <Image source={{ uri: bicicleta.imagenes![0].imagen_url } as ImageSourcePropType} style={{ width: 50, height: 50, borderRadius: 20 / 2 }} />
                        <View style={tw`pl-3 pr-12 flex-1`}>
                            <Text style={tw`font-bold ${TEXT_COLORS.DARK_BLUE}`} numberOfLines={1}>
                                Modelo: {bicicleta.tipo}
                            </Text>
                            <View style={tw`pt-1`}>
                                <Text numberOfLines={3}> Marca: {bicicleta.marca} </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableHighlight
                        onPress={eliminarBici}
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
