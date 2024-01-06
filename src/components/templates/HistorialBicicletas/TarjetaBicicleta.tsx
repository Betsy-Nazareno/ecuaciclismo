import * as React from 'react'
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Modal
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
    const [modalVisible, setModalVisible] = React.useState(false);
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
        <Pressable  >
            <ContenedorPaginasDetalle borderRight colorBorder="#F16F31" borderWidth={8} styleProps="mt-1">
                <View style={[tw`flex flex-row items-center py-2`, styles.container]}>
                    <View style={tw`flex-row flex-1`}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image 
                            source={{ uri: bicicleta.imagenes![0].imagen_url } as ImageSourcePropType} 
                            style={{ width: 50, height: 50, borderRadius: 20 / 2 }} 
                        />
                    </TouchableOpacity>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                        <Image 
                            source={{ uri: bicicleta.imagenes![0].imagen_url }} 
                            style={styles.fullSizeImage} 
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    fullSizeImage: {
        width: 300, // Puedes ajustar según el tamaño de pantalla
        height: 300, // Puedes ajustar según el tamaño de pantalla
        resizeMode: 'contain',
    },
})
