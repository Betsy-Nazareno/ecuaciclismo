import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'

import SectionTitle from '../../moleculas/SectionTitle'
import ListaBicicletas from './ListaBicicletas'
import { View, Image, TouchableHighlight } from 'react-native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'


const HistorialBicicletas = () => {
    const navigation =
        useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <ScrollView style={tw`px-2 py-4`}>
            <View style={tw`flex-row items-center justify-between`}>
                <SectionTitle text="Mis Bicicletas" />
                <View style={tw`flex-row items-center`}>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('BicicletaFormulario', { tokenUsuario: '' })}
                        activeOpacity={0.6}
                        underlayColor="#F16F31"
                        style={{ borderRadius: 100 / 2 }}
                    >
                        <Image source={require('../../../../assets/boton-agregar.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                    </TouchableHighlight>
                </View>
            </View>
            <ListaBicicletas />
        </ScrollView>
    )
}

export default HistorialBicicletas
